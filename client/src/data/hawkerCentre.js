import React from "react"
import { useQuery } from "react-query";

const fetchHC = async () => {
  const res = await fetch("v1/hawkers");
  const json = await res.json()
  console.log ("json: ", json) 
  return json
  // return res.json();
}

const FetchHawkerCentre = () => {
  const {data, status} = useQuery("hawkerCentres", fetchHC);
  if (status === 'error'){
    console.log("error")
  }
  else if (status == 'loading'){
    console.log("loading")
  }
  else {
    console.log("data: ", data)
    console.log(data.map((name)=> name.name))
    return data.map((name)=> name.name)
  }
  // const names = data.map((name)=> name.name)
  // return names
  return <></>
}

export default FetchHawkerCentre





// const HawkerCentre = () => {

// const {data} = useQuery("hawkercentres", () =>
//     axios("v1/hawkers")
//   );

//   // if (error) return <h1>Error, {error.message}, try again </h1>;
//   // if (isLoading) return <h1>Loading....</h1>;
// const centreNames = data?.data
// const list = centreNames?.map((item) => {
//   return item.name
// })


//   return <></>
 
// };

// export default HawkerCentre;
