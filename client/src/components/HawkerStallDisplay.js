import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import PostArray from "./PostArray";

import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
      paddingRight: 0,
    },
  },
  div: {
    marginTop: "60px",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const HawkerStallDisplay = () => {
  const classes = useStyles();
  const { centreName, stall } = useParams();

  ////// STORE INFORMATION /////////
  /////////// FETCHES STALL INFORMATION ////////
  const {
    data: stalldata,
    error,
    isLoading,
  } = useQuery(["hawkerstallsQuery", centreName], () =>
    axios(`/v1/hawkers/${centreName}`)
  ); // this gives stalls from hawker centre

  // WHICH HAWKER STALL
  const stallsArray = stalldata?.data?.hawker_stalls; // this gives stalls from hawker centre in object
  // SELECT THE STALL
  const selectedStall = stallsArray?.filter((item) => item.name === stall);
  console.log("this is selectedStall", selectedStall); // this is stall description => map it out

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
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {stall}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                🔥Shiokmeter: {selectedStall[0]?.score}/5
              </Typography>
              <Typography variant="h6" color="inherit">
                Closed on: {selectedStall[0]?.closed_days}
              </Typography>
              <Typography variant="h6" color="inherit">
                Operating hours: {selectedStall[0]?.operating_hours}
              </Typography>
              <Typography variant="h6" color="inherit">
                Unit number: #{selectedStall[0]?.unit_number}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {/* <h1>Stall name: {stall}</h1>
      <h4>Closed on: {selectedStall[0]?.closed_days} </h4>
      <h4>Operating hours: {selectedStall[0]?.operating_hours} </h4> 
      <h4>Unit number: #{selectedStall[0]?.unit_number}</h4> 
      <h4>Shiokmeter: {selectedStall[0]?.score}/5 </h4> */}

      <PostArray />
    </>
  );
};

export default HawkerStallDisplay;
