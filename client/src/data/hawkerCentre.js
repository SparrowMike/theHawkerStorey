import axios from "axios";
import { useQuery } from "react-query";

const hawkerCentre = () => {


  const { isLoading, error, data } = useQuery("hawkercentres", () => 
  axios("v1/hawkers")
  );

  if (error) return <h1>Error, {error.message}, try again </h1>;
  if (isLoading) return <h1>Loading....</h1>

  console.log(data)

  return

}

export default hawkerCentre;
