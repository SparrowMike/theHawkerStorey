import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Image } from "cloudinary-react";

import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Container,
  Button,
  Modal,
  Backdrop,
  Fade,
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

const PostArray = () => {
  const classes = useStyles();
  const { stall } = useParams();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");
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

  //*===============OPEN MODAL==============
  const handleOpen = (e) => {
    setOpen(true);
    setModalData(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("modalData",modalData)

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {selectedStallPosts?.map((item, index) => {
            return (
              //  <img src={item.image_url} alt={item.name}>{item.name}</img>
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      key={index}
                      image={item.image_url}
                      title={item.name}
                      onClick={() => handleOpen(item)}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {item.dishes_id.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}

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


        </Grid>
      </Container>
    </>
  );
};

export default PostArray;
