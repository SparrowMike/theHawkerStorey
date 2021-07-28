import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AutocompleteHS = ({ hawkerCentre, setHawkerStall }) => {
  //* Fetching of hawker stalls
  const { data, isLoading } = useQuery(
    "hawkerstalls",
    async () => await axios(`/v1/hawkers/${hawkerCentre}`)
  );

  //* map stall names and pass to autocomplete as options
  const hsList = data?.data?.hawker_stalls?.map((stall) => stall.name);

  return (
    <>
      {isLoading ? (
        <h1>Fetching Hawker Stall Options</h1>
      ) : (
        <Autocomplete
          id="Hawker Stall"
          options={hsList}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setHawkerStall(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Hawker Stall" variant="outlined" />
          )}
        />
      )}
    </>
  );
};

export default AutocompleteHS;
