import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Container,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "70%",
  },
  cardContent: {
    flexGrow: 1,
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
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {selectedStallPosts?.map((item, key) => {
            return (
              //  <img src={item.image_url} alt={item.name}>{item.name}</img>
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.image_url}
                      title={item.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {item.dishes_id.toUpperCase()}
                      </Typography>
                      {/* add <Link to> */}
                      <Button size="medium" color="primary">
                        See More
                      </Button>
                      {/* add </Link> */}
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default PostArray;
