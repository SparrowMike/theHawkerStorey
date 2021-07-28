import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import PostArray from "./PostArray"

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";


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

const HawkerStallDisplay = () => {

 
const classes = useStyles();
const {centreName, stall} = useParams()

////// STORE INFORMATION /////////
/////////// FETCHES STALL INFORMATION ////////
const { data: stalldata, error, isLoading } = useQuery(["hawkerstallsQuery", centreName], 
() => axios(`/v1/hawkers/${centreName}`)); // this gives stalls from hawker centre

// WHICH HAWKER STALL
const stallsArray = stalldata?.data?.hawker_stalls // this gives stalls from hawker centre in object
// SELECT THE STALL 
const selectedStall = stallsArray?.filter(item => item.name === stall)
console.log("this is selectedStall", selectedStall) // this is stall description => map it out

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
    <div>


      <h1>Stall name: {stall}</h1>
      <h4>Closed on: {selectedStall[0]?.closed_days} </h4>
      <h4>Operating hours: {selectedStall[0]?.operating_hours} </h4> 
      <h4>Unit number: #{selectedStall[0]?.unit_number}</h4> 
      <h4>Shiokmeter: {selectedStall[0]?.score}</h4>

      <PostArray />

    </div>
  );
}

export default HawkerStallDisplay;

