const express = require("express");
const router = express.Router();
const HawkerStalls = require("../models/hawkerStalls");

//Gets all hawker stalls
router.get("/", (req, res) => {
  res.send("hawker stalls");
});

//seed
router.get("/seed", (req, res) => {
  HawkerStalls.remove({}, (err, fruits) => {
    HawkerStalls.create([
      {
        name: "No1 Maxwell",
        operating_hours: "0900 - 1800",
        closed_days: "Monday",
        unit_number: "01-01",
        score: 5,
        image_url: "",
        dishes: ["Hokkien Mee", "Wanton Mee"],
        hawker_centre: "Maxwell Food Centre",
      },
    ]);
  });
});

module.exports = router;
