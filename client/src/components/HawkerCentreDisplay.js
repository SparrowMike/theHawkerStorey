import React from "react";
import { useQuery } from "react-query";
import {useParams} from "react-router-dom";
import axios from "axios"
import StallArrays from "./StallArrays";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  div:{
    marginTop: "60px",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const HawkerCentreDisplay = () => {
  const classes = useStyles();

  const {centreName} = useParams();
  const {data, isLoading, error} = useQuery("hawkerCentres", 
  ()=> axios(`/v1/hawkers/${centreName}`))

  const centres = data?.data;
  console.log("centreName: ", centreName)
  console.log("centres: ", centres)
  
  if (error){
    console.log("error: ", error.message)
  return (
  <Container className={classes.div}> 
  Error:{error.message}, try again!
  </Container>
  )
}
  if (isLoading) {
    console.log("loading...")
  return (
  <Container className={classes.div}> 
  Loading 
  </Container>
  )
}
  return (
    <>
  <Container className={classes.div}>
     <h1>{centres.name}</h1>
     <h2>{centres.address.street_address} {centres.address.postal_code}</h2>
     <h3>{centres.description}</h3>
    </Container>
    <Container className={classes.cardGrid} maxWidth="lg">
    <Grid container spacing={4}>
      {centres.hawker_stalls.map((stall, index)=> <StallArrays stall={stall} index={index}/>)}
    </Grid>
    </Container>
    </> 
  )
}

export default HawkerCentreDisplay;
