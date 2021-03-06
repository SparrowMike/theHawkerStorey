import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import axios from "axios";
// import Post from './Post'
import UserProfilePosts from "./UserProfilePosts";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: "60px",
    marginBottom: "40px",
  },
  wrapAvatar: {
    verticalAlign: "middle",
    display: "inline-flex",
    alignItems: "center",
  },
  avatar: {
    margin: "10px",
  },
  post: {
    color: "red",
  },
}));

const UserProfile = ({ loaded }) => {
  const classes = useStyles();
  const [edited, setEdited] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["user", id, loaded, edited, deleted],
    () => axios(`/v1/users/${id}`) //searching for all information from that user
  );

  const user = data?.data;

  // const postHistory = user?.posts_history
  // console.log("posthistory",postHistory)
  // queryClient.invalidateQueries("user")
  // queryClient.setQueryData("user")
  // console.log("user information: ", user);

  if (error) {
    console.log("error: ", error.message);
    return (
      <Container className={classes.div}>
        Error:{error.message}, try again!
      </Container>
    );
  }
  if (isLoading) {
    console.log("loading...");
    return <Container className={classes.div}>Loading</Container>;
  }

  return (
    <>
      <Container className={classes.div}>
        <Typography variant="h5" className={classes.wrapAvatar}>
          <Avatar className={classes.avatar}></Avatar>
          {user.username}
        </Typography>
        <Typography variant="h4" className={classes.div}>
          Posts
        </Typography>
      </Container>
      <Container>
        <Grid container spacing={4}>
          {user?.posts_history.reverse().map((post, index) => (
            <UserProfilePosts
              post={post}
              key={index}
              color="primary"
              className={classes.post}
              edited={edited}
              setEdited={setEdited}
              deleted={deleted}
              setDeleted={setDeleted}
            />
          ))}
        </Grid>
      </Container>
      <Container className={classes.div}></Container>
    </>
  );
};

export default UserProfile;
