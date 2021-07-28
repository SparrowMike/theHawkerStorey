import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AutocompleteHS = ({ hawkerCentre, setHawkerStall }) => {
  //* Fetching of hawker stalls
  const { data, isLoading } = useQuery(
    ["hawkerstalls", hawkerCentre],
    async () => await axios(`/v1/hawkers/${hawkerCentre}`)
  );

  //* map stall names and pass to autocomplete as options
  const hsList = data?.data?.hawker_stalls
    ?.map((stall) => stall.name)
    ?.sort((a, b) => a.localeCompare(b, { ignorePunctuation: true }));

  return (
    <>
      {isLoading ? (
        <Autocomplete
          id="Hawker Stall"
          disabled
          options={hsList}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setHawkerStall(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Hawker Stall" variant="outlined" />
          )}
        />
      ) : (
        <Autocomplete
          id="Hawker Stall"
          autoHighlight
          clearOnEscape
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
