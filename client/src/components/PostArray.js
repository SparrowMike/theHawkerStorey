import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  Container,
} from "@material-ui/core";

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
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const PostArray = () => {
  const classes = useStyles();
  const { stall } = useParams();
  // const [post, setPost] = useState([]);

  /////////// POSTS /////////////
  ////////// FETCHES POST INFORMATION /////////
  const {
    data: postdata,
    error,
    isLoading,
   
  } = useQuery(["postsQuery", stall], () => axios("/v1/posts"));
  console.log("this is postdata", postdata?.data);

  // POSTS OF SELECTED STALL
  const postsArray = postdata?.data;

  // SELECT THE POSTS
  const selectedStallPosts = postsArray?.filter(
    (item) => item.hawkerStall === stall
  );
  console.log("this is selectedstallpost", selectedStallPosts);

  if (error) {
    console.log("error: ", error.message);
    return (
      <Container className={classes.div}>
        Error:{error.message}, try again!
      </Container>
    );
  }
  if (isLoading) {
    console.log("postarray loading...");
    return <Container className={classes.div}>Loading</Container>;
  }
  // if (isSuccess && post[0]?._id !== selectedStallPosts[0]?._id) {
  //   setPost(selectedStallPosts);
  // }

  return (
    <>
      {selectedStallPosts?.map((item, key) => {
        return (
         <img src={item.image_url} alt={item.name}>{item.name}</img>          
        )
      })}
    </>
  );
};

export default PostArray;
