import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import axios from "axios";
// import Post from './Post'
import UserProfilePosts from "./UserProfilePosts";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  div: {
    marginTop: "60px",
    marginBottom: "40px",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  wrapAvatar: {
    verticalAlign: "middle",
    display: "inline-flex",
    alignItems: "center",
  },
  avatar: {
    margin: "10px",
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["user", id], () =>
    axios(`/v1/users/${id}`)
  );

  const user = data?.data;
  console.log("user information: ", user);

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
          <Avatar className={classes.avatar}>
            {user.username[0].toUpperCase()}
          </Avatar>{" "}
          {user.username}
        </Typography>
        <Typography variant="h4" className={classes.div}>
          Posts
        </Typography>
      </Container>
      <Container>
        <Grid container spacing={4}>
          {user.posts_history.map((post, index) => (
            <UserProfilePosts post={post} key={index} color="primary" />
          ))}
        </Grid>
      </Container>
      <Container className={classes.div}></Container>
    </>
  );
};

export default UserProfile;
