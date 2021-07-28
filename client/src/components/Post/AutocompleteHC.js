import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab/";
import { TextField } from "@material-ui/core/";

const AutocompleteHC = ({ setHawkerCentre, setHawkerStall, setDishName }) => {
  //* Fetching of hawker centres data
  const { data } = useQuery(
    ["hawkercentre-list"],
    async () => await axios("/v1/hawkers/")
  );

  const hcList = data?.data
    ?.map((hc) => hc.name)
    ?.sort((a, b) => a.localeCompare(b, { ignorePunctuation: true }));

  return (
    <Autocomplete
      id="Hawker Centre"
      autoHighlight
      clearOnEscape
      options={hcList}
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => {
        setHawkerCentre(newValue);
        setHawkerStall("");
        setDishName("");
      }}
      renderInput={(params) => (
        <TextField {...params} label="Hawker Centre" variant="outlined" />
      )}
    />
  );
};

export default AutocompleteHC;
