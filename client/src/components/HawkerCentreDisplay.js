import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import StallArrays from "./StallArrays";

import {
  makeStyles,
  Paper,
  Grid,
  Card,
  Typography,
  Container
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
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

const HawkerCentreDisplay = () => {
  const classes = useStyles();

  const { centreName } = useParams();
  const { data, isLoading, error } = useQuery(["hawkercentres", centreName], () =>
    axios(`/v1/hawkers/${centreName}`)
  );

  const centres = data?.data;
  console.log("centreName: ", centreName);
  
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
  console.log("centre information: ", centres);
  return (
    <>
    <Paper className={classes.mainFeaturedPost}>
    <div className={classes.overlay} />
    <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {centres.name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            {centres.address.street_address} {centres.address.postal_code}
            </Typography>
            <Typography variant="body" color="inherit">
            {centres.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {centres.hawker_stalls.map((stall, index) => (
            <StallArrays stall={stall} key={index} centreName={centreName} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HawkerCentreDisplay;
