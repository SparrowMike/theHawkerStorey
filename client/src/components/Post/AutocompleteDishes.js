import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AutocompleteDishes = ({ hawkerCentre, hawkerStall, setDishName }) => {
  const { data: dishes } = useQuery(
    ["dishes-list", hawkerStall, hawkerCentre],
    async () => await axios("/v1/dishes")
  );

  const { data: hawkerStallList } = useQuery(
    ["hawkerstalls", hawkerCentre],
    async () => await axios(`/v1/hawkers/${hawkerCentre}`)
  );

  //* retrieve all dishes that the selected hawker stall sells
  const dishArr = hawkerStallList?.data?.hawker_stalls
    .filter((stall) => stall.name === hawkerStall)[0]
    .dishes.map((dish) => dish);

  //* extract name based on dishes._id
  const dishList = dishes?.data;
  let stallDishes = [];
  if (dishList) {
    for (let dish of dishArr) {
      for (let item of dishList) {
        if (dish === item._id) stallDishes.push(item.name);
      }
    }
    stallDishes.sort((a, b) => a.localeCompare(b, { ignorePunctuation: true }));
  }

  return (
    <Autocomplete
      id="Dish Name"
      autoHighlight
      clearOnEscape
      options={stallDishes ? stallDishes : "No Dishes"}
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => {
        setDishName(newValue);
      }}
      style={{ width: "100vw" }}
      renderInput={(params) => (
        <TextField {...params} label="Dish Name" variant="outlined" />
      )}
    />
  );
};

export default AutocompleteDishes;
