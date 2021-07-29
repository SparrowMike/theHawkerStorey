import React, { useState } from "react";

import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Modal,
  Backdrop,
  Fade,
  Avatar,
  Divider,
} from "@material-ui/core";
import styles from "../../src/FetchImages.module.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      transform: "translateY(-3px)",
      cursor: "pointer",
      boxShadow: "rgba(0, 0, 0, 0.56) 0px 12px 12px 4px",
    },
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
    width: "100%",
    heigth: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  modal: {
    overflow: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
}));

const UserProfilePosts = ({ post }) => {
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

  console.log("modalData", modalData);
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card} onClick={() => handleOpen(post)}>
          {/*=====   add link to posts modal/page =======*/}
          <img src={post.image_url} alt="user post" />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="body">
              {post.review}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
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
                <Avatar style={{ marginRight: "10px" }}></Avatar>Username
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
                <strong>{modalData.dishes_id}</strong> from{" "}
                {modalData.hawkerStall}
              </Typography>
              <Typography gutterBottom variant="body1">
                Hawker Centre: {modalData.hawkerCentre}
              </Typography>
              <CardActions gutterBottom>
                <Button size="small" variant="contained" color="primary">
                  Edit
                </Button>
                <Button size="small" variant="contained">
                  Delete
                </Button>
              </CardActions>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default UserProfilePosts;
