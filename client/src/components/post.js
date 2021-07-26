import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import dishNameDATA from "./../data/dishName";
import hawkerStallsDATA from "./../data/hawkerStalls";
import hawkerCentreDATA from "./../data/hawkerCentre";

import { DropzoneArea } from "material-ui-dropzone";

import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core";

//! dave imageupload test
// import ImageUpload from "./imageUpload/ImageUpload";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("hawkerCentre", hawkerCentre);
    console.log("hawkerStall", hawkerStall);
    console.log("image", image);
    console.log("dishName", dishName);
    console.log("review", review);
    console.log("rating", rating);

    //* code for image upload
    const reader = new FileReader();
    if (!image) return;
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
    console.log("Attempting upload - ", base64EncodedImage);
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
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="Hawker Centre"
              options={hawkerCentreDATA}
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
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="Hawker Stall"
              options={hawkerStallsDATA}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                setHawkerStall(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hawker Stall"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* ====================MATERIAL UI DROPZONE==================== */}
          <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              filesLimit={1}
              maxFileSize={10000000}
              onChange={(files) => {
                setImage(files[0]);
              }}
            />
            {/* <ImageUpload /> */}
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
