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
import ImageUpload from "./imageUpload/ImageUpload"

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
              onChange={(files) => console.log("Files:", files)}
            />
            <ImageUpload />
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
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
}
