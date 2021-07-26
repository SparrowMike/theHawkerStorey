import axios from "axios";
import { useQuery } from "react-query";

const HawkerCentre = () => {

const {data} = useQuery("hawkercentres", () =>
    axios("/v1/hawkers")
  );

  // if (error) return <h1>Error, {error.message}, try again </h1>;
  // if (isLoading) return <h1>Loading....</h1>;

  console.log("this is the data", data.data);

  return <></>
 
};

export default HawkerCentre;
