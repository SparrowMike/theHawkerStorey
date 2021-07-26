import axios from "axios";
import { useQuery } from "react-query";

const HawkerCentre = () => {

const {data} = useQuery("hawkercentres", () =>
    axios("http://localhost:4000/v1/hawkers")
  );

  // if (error) return <h1>Error, {error.message}, try again </h1>;
  // if (isLoading) return <h1>Loading....</h1>;
const centreNames = data?.data
const list = centreNames?.map((item) => {
  return item.name
})


  return <></>
 
};

export default HawkerCentre;
