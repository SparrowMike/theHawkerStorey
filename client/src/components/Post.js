import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import dishNameDATA from "../data/dishName";
import hawkerStallsDATA from "../data/hawkerStalls";
import HawkerCentre from "../data/hawkerCentre";

import { DropzoneArea } from "material-ui-dropzone";

import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core";

import AutocompleteHS from "./AutocompleteHS";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "70vw",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Post({ handleClosePost }) {
  const classes = useStyles();

  const [hawkerCentre, setHawkerCentre] = useState("");
  const [hawkerStall, setHawkerStall] = useState("");
  const [image, setImage] = useState("");
  const [dishName, setDishName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);

  // Fetching of hawker centres
  const { data } = useQuery("hawkercentres", () => axios("/v1/hawkers"));

  const centreNames = data?.data;
  const hcList = centreNames?.map((item) => {
    return item.name;
  });

  // Fetching of hawker stalls
  //   const {data} = useQuery("hawkercentres", () =>
  //   axios("v1/hawkers/maxwell-food-centre/")
  //       );

  //   const centreNames = data?.data
  //   const hcList = centreNames?.map((item) => {
  // return item.name
  //   })

  const handleSubmit = (e) => {
    e.preventDefault();

    //* code for image upload
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Something went wrong");
    };

    handleClosePost();
  };

  //* convert image binary into string (base64EndcodedImage) and calls fetch route
  //! to change fetch route to post controller route when we move code from server.js to posts
  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setImage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.paper}>
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Add New Post
        </Typography>
        <Grid container spacing={3}>
          {/* ====================MATERIAL UI Autocomplete for hawkerCentre option selection: pairs to hawkerCentreData==================== */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="Hawker Centre"
              options={hcList}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                setHawkerCentre(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hawker Centre"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* ====================MATERIAL UI Autocomplete for hawkerStall option selection: pairs to hawkerStallsDATA==================== */}
          <Grid item xs={12} md={6}>
            <AutocompleteHS
              hawkerCentre={hawkerCentre}
              setHawkerStall={setHawkerStall}
            />
          </Grid>
          {/* ====================MATERIAL UI DROPZONE for image uploading: pairs to Cloudinary==================== */}
          <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              filesLimit={1}
              onChange={(files) => {
                setImage(files[0]);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="Dish Name"
              options={dishNameDATA}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                setDishName(newValue);
              }}
              // style={{ width: "50vw" }}
              renderInput={(params) => (
                <TextField {...params} label="Dish Name" variant="outlined" />
              )}
            />
          </Grid>
          {/* ====================MATERIAL UI Textfield for user to write reviews=================== */}
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Review"
              multiline
              rows={4}
              style={{ width: "100%" }}
              variant="outlined"
              onChange={(event) => {
                setReview(event.target.value);
              }}
            />
          </Grid>
          {/* ====================MATERIAL UI Rating for users to select review=================== */}
          <Grid item xs={12}>
            <Rating
              size="large"
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Box textAlign="right">
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
}
