import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Image } from "cloudinary-react";
import {
  Container,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

import StackGrid from "react-stack-grid";
// import StackGrid, { transitions } from "react-stack-grid";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    // width: "300px",
  },
  cardMedia: {
    padding: "10px",
    width: "100%",
    heigth: "100%",
    transform: "500ms ease-in-out 25ms",
    "&:hover": {
      transform: "translateY(-3px)",
      cursor: "pointer",
      boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
    },
  },
  stackGrid: {
    padding: "40px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FetchImages = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //* pull posts from mongoose to display images by cloudinary ids
  const { isLoading, data } = useQuery("get-posts", () => axios("v1/posts"));
  const imageIds = data?.data.map((image) => image.cloudinary_id);

  return (
    <>
      <Container className={classes.container}>
        <StackGrid columnWidth={300} className={classes.stackGrid}>
          {isLoading ? (
            <h1>Hang on while we fetch some yummy photos!</h1>
          ) : (
            imageIds &&
            imageIds.map((imageId, index) => (
              <Image
                className={classes.cardMedia}
                key={index}
                onClick={handleOpen}
                cloudName={"hawkerstorey"}
                publicId={imageId}
                crop="scale"
              />
            ))
          )}
        </StackGrid>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}></div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default FetchImages;
