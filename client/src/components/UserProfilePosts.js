import React, {useState} from "react";
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
  },
  cardContent: {
    flexGrow: 1,
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
          <img src={post.image_url} alt="user post" />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="body">
              {post.review}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/*=====   Modal to post info =======*/}
      <UserProfileModal modalData={modalData} handleClose={handleClose} open={open} post={post}/>
    </>
  );
};

export default UserProfilePosts;
