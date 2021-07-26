import axios from "axios";
import { useQuery } from "react-query";

const DishName = () => {
  const { data } = useQuery("dishname", () => 
  axios("v1/dishes"));

  // if (error) return <h1>Error, {error.message}, try again </h1>;
  // if (isLoading) return <h1>Loading....</h1>;

  const dishName = data?.data?.map((item) => {
    return item.name;
  });

  console.log("this is dishnames", dishName);

  return <></>;
};

export default DishName;
