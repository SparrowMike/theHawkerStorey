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
  Avatar,
  Divider,
} from "@material-ui/core";
import styles from "../../src/FetchImages.module.css";

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
  // const postData = data?.data.reverse();
  const postData = data?.data;

  if (isLoading) {
    return (
      <Container className={classes.container}>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          cooking up a storm, be with you in a jiffy!
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
              <img
                className={styles.modalImages}
                src={modalData.image_url}
                alt={modalData.dishes_id}
              />
              <div className={styles.post}>
                <Typography className={classes.wrapAvatar}>
                  <Avatar style={{ marginRight: "10px" }}></Avatar>
                  {modalData.username}
                </Typography>
                <Divider style={{ margin: "5px 0" }} />
                <Typography gutterBottom variant="body1" component="h2">
                  {modalData.review}
                </Typography>
                <Typography gutterBottom variant="body1">
                  🔥Shiokmeter: {modalData.rating}
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Typography gutterBottom variant="body1">
                  <strong>{modalData.dishes_name}</strong> from{" "}
                  {modalData.hawkerStall}
                </Typography>
                <Typography gutterBottom variant="body1">
                  Hawker Centre: {modalData.hawkerCentre}
                </Typography>
              </div>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default FetchImages;
