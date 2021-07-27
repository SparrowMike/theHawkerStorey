import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AutocompleteDishes = ({ hawkerCentre, hawkerStall, setDishName }) => {
  const { data: dishes } = useQuery(
    "dishes",
    async () => await axios("/v1/dishes")
  );

  const { data: hawkerStallList } = useQuery(
    "hawkerstalls",
    async () => await axios(`/v1/hawkers/${hawkerCentre}`)
  );

  const dishArr = hawkerStallList?.data?.hawker_stalls
    .filter((stall) => stall.name === hawkerStall)[0]
    .dishes.map((dish) => dish);

  const dishList = dishes?.data;

  console.log(dishArr, dishList);

  let stallDishes = [];
  if (dishList) {
    for (let dish of dishArr) {
      for (let item of dishList) {
        if (dish === item._id) stallDishes.push(item.name);
      }
    }
  }

  // if (dishList) {
  //   const myDishes = dishList.filter(
  //     (dish) => dish._id === dishArr.includes(dish)
  //   );
  //   console.log(myDishes);
  // }

  return (
    <Autocomplete
      id="Dish Name"
      options={stallDishes}
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => {
        setDishName(newValue);
      }}
      // style={{ width: "50vw" }}
      renderInput={(params) => (
        <TextField {...params} label="Dish Name" variant="outlined" />
      )}
    />
  );
};

export default AutocompleteDishes;
