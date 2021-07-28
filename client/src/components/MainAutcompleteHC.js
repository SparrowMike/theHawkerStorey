import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { Autocomplete } from "@material-ui/lab/";
import { TextField } from "@material-ui/core/";

const MainAutocompleteHC = () => {
  const { data } = useQuery(
    "hawkercentre-list",
    async () => await axios("/v1/hawkers/")
  );

  const history = useHistory();

  const hcList = data?.data?.map((hc) => hc.name);

  const handleChangeRoute = (event, newValue) => {
    console.log("hawkercentreSelected",newValue)
    history.push(`/${newValue}`)
  }; 




  return (
    <Autocomplete
      id="Hawker Centre"
      options={hcList}
      getOptionLabel={(option) => option}
      onChange={handleChangeRoute}
      renderInput={(params) => (
        <TextField {...params} label="select a hawker centre" variant="outlined" />
      )}
    />
  );
};

export default MainAutocompleteHC;
