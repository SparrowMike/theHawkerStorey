import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Image } from "cloudinary-react";
import {
  Container,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
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
    postition: "fixed",
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
    // overflow: "scroll",
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
  const [modal, setModal] = useState("");

  //*===============OPEN MODAL==============
  const handleOpen = (e) => {
    setOpen(true);
    setModal(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //* pull posts from mongoose to display images by cloudinary ids
  const { isLoading, data } = useQuery("get-posts", () => axios("v1/posts"));
  const imageIds = data?.data.map((image) => image.cloudinary_id);

  console.log(data);

  return (
    <>
      <Container className={classes.container}>
        <StackGrid
          columnWidth={300}
          className={classes.stackGrid}
          duration={1000}
          monitorImagesLoaded={true}
        >
          {isLoading ? (
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Hang on while we fetch some yummy photos!
            </Typography>
          ) : (
            imageIds.map((imageId, index) => (
              <Image
                className={classes.cardMedia}
                key={index}
                onClick={() => handleOpen(imageId)}
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
            <div className={classes.paper}>
              <Image
                cloudName={"hawkerstorey"}
                publicId={modal}
                crop="scale"
                width={300}
              />
              <Typography variant="h5" align="center">
                Some text will go here right?
              </Typography>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default FetchImages;
