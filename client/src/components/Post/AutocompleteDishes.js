import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AutocompleteDishes = ({ hawkerStall, setDishName }) => {
  const { data } = useQuery("dishes", async () => await axios("/v1/dishes"));

  const dishNames = data?.data;
  console.log("dishnames", dishNames);
  const dishList = dishNames?.map((dish) => {
    return dish.name;
  });

  return (
    <Autocomplete
      id="Dish Name"
      options={dishList}
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
