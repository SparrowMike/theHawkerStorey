const express = require("express");
const router = express.Router();
const HawkerStalls = require("../models/hawkerStalls");
const HawkerCentre = require("../models/hawkerCentre")

//? Gets all hawker centres
//localhost:4000/v1/hawkers
router.get("/", (req, res) => {
  res.send("hawker centre");
});

//? Gets all hawkerstalls in hawker centre
//localhost:4000/v1/maxwell%food%centre/stalls
router.get("/:hawkercentrename/stalls", (req, res)=> {
  res.send("hawkerstalls in hawkercentre")
})

//? seed hawker centres
//localhost:4000/v1/hawkers/seed
router.get("/seed", (req,res)=> {
  // HawkerCentre.remove({}, (err, hawkerCentres)=>{
    HawkerCentre.create([
      {
        name: "Maxwell Food Centre",
        address: {
          street_address: "1, Kadayanallur Street",
          postal_code: "069184",
          description: "We wouldn’t believe anyone who say they haven’t been here, but if you really haven’t, here are the highlights from Singapore’s favourite tourist-approved hawker centre. Starting with Tian Tian Chicken Rice (Anthony Bourdain-approved, mind you), you should take note of other favourites like Zhen Zhen Porridge, and Maxwell Fuzhou Oyster Cake."
        },
    },
    {
      name: "Adam Road Food Centre",
      address: {
        street_address: "2, Adam Road",
        postal_code: "289877",
        description: "Small but mighty, Adam Road FC counts famous stalls such as Selera Nasi Lemak as tenants."
      },
  }
    ],
    (err, data)=>{
      res.redirect("/v1/hawkers")
    })
  // })
})

//? seed hawkerstalls
//localhost:4000/v1/hawkers/stalls/seed
router.get("/stalls/seed", (req, res) => {
  // HawkerStalls.remove({}, (err, hawkerStalls) => {
    HawkerStalls.create([
      {
        name: "No1 Maxwell",
        operating_hours: "0900 - 1800",
        closed_days: "Monday",
        unit_number: "01-01",
        score: 5,
        image_url: "https://cache-wak-wak-hawker-com.s3-ap-southeast-1.amazonaws.com/data/images/stall/64/864/block/LQO1R82f328jzczp.jpg?v=1612194949",
        dishes: ["Hokkien Mee", "Wanton Mee", "Laksa"],
        hawker_centre: "Maxwell Food Centre",
      },
    ]);
  // });
});

module.exports = router;
