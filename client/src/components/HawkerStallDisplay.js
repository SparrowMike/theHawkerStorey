import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const HawkerStallDisplay = () => {
  const { centreName, stall } = useParams();

  //fetches stall information
  const { data: stalldata } = useQuery("hawkerstalls", () =>
    axios(`/v1/hawkers/${centreName}`)
  );
  console.log("data for list of hawkerstalls", stalldata?.data?.hawker_stalls);

  // const stallList = stalldata?.data?.hawker_stalls

  // fetches post information
  const { data: postdata } = useQuery("posts", () => axios("/v1/posts"));
  console.log("this is postdata", postdata?.data);

  // const postdata = postdata?.data.filter(post => ) ;

  return (
    <div>
      <h1>This shows all the hawker stalls</h1>
      Title: {stalldata?.data?.name} <br /> <br />
      Description: {stalldata?.data?.description} <br />
      Now showing {centreName} {stall}
    </div>
  );
};

export default HawkerStallDisplay;

// router.get("/:centreName/", (req, res)=> {
//   const centreName = req.params.centreName;
//   HawkerCentre.findOne({name: centreName}).populate("hawker_stalls").
//   exec(function (err, HawkerCentre){
//     console.log(HawkerCentre)
//     if(err){
//       res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
//     }
//     res.status(StatusCodes.OK).json(HawkerCentre)
//   });
//   })
