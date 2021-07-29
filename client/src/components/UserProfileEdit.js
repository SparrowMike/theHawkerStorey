import React from "react";
import { useState } from "react";

import {
  makeStyles,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab/";

// import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPost: {
    fontSize: "16px",
  },
  modalHeader: {
    fontSize: "16px",
  },
  wrapAvatar: {
    verticalAlign: "middle",
    display: "inline-flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  paper: {
    maxHeight: "800px",
    width: "500px",
    backgroundColor: "#f5f3f0",
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 3),
  },
  media: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const UserProfileEdit = ({ openEdit, handleEditClose, post, postID }) => {
  const classes = useStyles();

  const id = postID;
  // console.log("this is the updated id: ", id);
  // const [hawkerCentre, setHawkerCentre] = useState(post.hawkerCentre);
  // const [hawkerStall, setHawkerStall] = useState(post.hawkerStall);
  // const [image, setImage] = useState(post.image_url);
  // const [dishName, setDishName] = useState(post.dishes_name);
  const [review, setReview] = useState(post.review);
  const [rating, setRating] = useState(post.rating);

  const handleRating = (event, newRating) => {
    if (newRating !== null) {
      setRating(newRating);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //* code for image upload
    // const reader = new FileReader();

    // reader.readAsDataURL(image);
    // reader.onloadend = () => {
    //   editPost(reader.result);
    // };
    // reader.onerror = () => {
    //   console.error("Something went wrong");
    // };
    editPost();

    handleEditClose();
    // handleClosePost();
  };

  //* convert image binary into string (base64EndcodedImage) and calls fetch route
  const editPost = async () => {
    try {
      await fetch(`/v1/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          // data: base64EncodedImage,
          // hawkerCentre: hawkerCentre,
          // hawkerStall: hawkerStall,
          review: review,
          rating: rating,
          // dishes_name: dishName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("Post submitted", res.data);
        // setImage("");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={openEdit}
      onClose={handleEditClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openEdit}>
        <div className={classes.paper}>
          <Typography gutterBottom variant="h5">
            Edit Post
          </Typography>
          {/* <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              filesLimit={1}
              onChange={(files) => {
                setImage(files[0]);
              }}
            />
          </Grid> */}
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            placeholder={post.review}
            style={{ width: "100%" }}
            variant="outlined"
            onChange={(event) => {
              setReview(event.target.value);
            }}
          />
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={rating}
              exclusive
              onChange={handleRating}
              aria-label="text alignment"
            >
              <ToggleButton value="3">
                <Typography>MUST GO!</Typography>
              </ToggleButton>
              <ToggleButton value="2">
                <Typography>CAN GO!</Typography>
              </ToggleButton>
              <ToggleButton value="1">
                <Typography>NO GO!</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            <Box textAlign="right">
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default UserProfileEdit;
