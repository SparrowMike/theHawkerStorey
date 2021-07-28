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
  media: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const FetchImages = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  //*===============OPEN MODAL==============
  const handleOpen = (e) => {
    setOpen(true);
    setModalData(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //* pull posts from mongoose to display images by cloudinary ids
  const { isLoading, data } = useQuery(["get-posts"], () => axios("v1/posts"));
  const postData = data?.data.reverse();

  if (isLoading) {
    return (
      <Container className={classes.container}>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Hang on while we fetch some yummy photos!
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container className={classes.container}>
        <StackGrid
          columnWidth={300}
          className={classes.stackGrid}
          duration={1000}
          monitorImagesLoaded={true}
        >
          {postData.map((data, index) => (
            <Image
              className={classes.cardMedia}
              key={index}
              onClick={() => handleOpen(data)}
              cloudName={"hawkerstorey"}
              publicId={data.image_url}
              crop="scale"
            />
          ))}
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
                publicId={modalData.image_url}
                crop="scale"
                width={320}
              />
              <Typography gutterBottom variant="h6" component="h2">
                Dish Name:
              </Typography>
              <Typography>{modalData.dishes_id}</Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Hawker Centre:
              </Typography>
              <Typography> {modalData.hawkerCentre}</Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Hawker Stall:
              </Typography>
              <Typography>{modalData.hawkerStall}</Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Review:
              </Typography>
              <Typography>{modalData.review}</Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Rating:
              </Typography>
              <Typography>{modalData.rating}</Typography>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default FetchImages;
