import React from 'react'
import { useMutation, useQueryClient } from "react-query";

export const TestProfileEdit = () => {
  const queryClient = useQueryClient();

  const uploadImage = async (base64EncodedImage, review, rating) => {
    try {
      await fetch(`/v1/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          data: base64EncodedImage,
          review: review,
          rating: rating,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("Post submitted", res.data);
        setImage("");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const mutation = useMutation(uploadImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("user")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = base64EncodedImage;
    const review = e.target.elements.review.value;
    const rating = e.target.elements.rating.value;
    mutate.mutate(data, review, rating)
  }



  return (
    <div>
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
    </div>
  )
}
