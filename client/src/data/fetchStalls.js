import React from "react";
import {useQuery} from "react-query";

const fetchStalls = async () => {
  const res = await fetch("v1/hawkers/:centreName/stalls")
}