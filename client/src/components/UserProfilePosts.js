import React, { useState } from "react";
import UserProfileModal from "./UserProfileModal";

import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

  //*=============HANDLE EDIT================

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card} onClick={() => handleOpen(post)}>
          <img src={post.image_url} alt="user post" />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="body">
              {post.review}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/*=====   Modal to post info =======*/}
      <UserProfileModal
        modalData={modalData}
        handleClose={handleClose}
        open={open}
        post={post}
      />
    </>
  );
};

export default UserProfilePosts;
