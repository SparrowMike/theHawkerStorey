import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import dishName from "./../data/dishName";
import hawkerStalls from "./../data/hawkerStalls";
import hawkerCentre from "./../data/hawkerCentre";

import { DropzoneArea } from "material-ui-dropzone";

import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core";

//! dave imageupload test
// import ImageUpload from "./imageUpload/ImageUpload";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "75vw",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Post() {
  const classes = useStyles();
  const [rating, setRating] = useState(4);
  const [selectedFile, setSelectedFile] = useState("");

  //* checks that there is an image when submit is clicked and uploads.
  //! to transfer this to form submit button when ready
  const handleSubmitFile = () => {
    // e.preventDefault();
    console.log("submitting", selectedFile);
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Something went wrong");
    };
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
      setSelectedFile("");
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
              options={hawkerCentre}
              getOptionLabel={(option) => option}
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
              options={hawkerStalls}
              getOptionLabel={(option) => option}
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
              onChange={(files) => {
                setSelectedFile(files[0]);
                console.log("Files:", files[0]);
              }}
            />
            {/* <ImageUpload /> */}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="Dish Name"
              options={dishName}
              getOptionLabel={(option) => option}
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
                variant="contained"
                color="primary"
                onClick={handleSubmitFile}
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
