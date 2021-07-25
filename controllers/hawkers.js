const express = require("express");
const router = express.Router();
const {StatusCodes} = require("http-status-codes")
const HawkerStalls = require("../models/hawkerStalls");
const HawkerCentre = require("../models/hawkerCentre")

//? Gets all hawker centres
//localhost:4000/v1/hawkers
router.get("/", (req, res) => {
  HawkerCentre.find({}, (err, foundHawkerCentres)=>{
    if(err){
      res.status(400).json({ error: err.message });
    };
    res.status(200).json(foundHawkerCentres);
  })
});

//? Gets all hawkerstalls in hawker centre
//localhost:4000/v1/maxwell%20food%20centre/stalls
router.get("/:hawker_centre/stalls", (req, res)=> { //!not too sure due to the spacing between HC name
  const hawkerCentre = req.params.hawker_centre
  HawkerStalls.find({hawker_centre: hawkerCentre}, (err, hawkerCentre)=>{ //!not too sure, need to research more on REF
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(hawkerCentre);
  })
})

//? seed hawker centres
//localhost:4000/v1/hawkers/seed
router.get("/seed", (req,res)=> {
  HawkerCentre.remove({}, (err, hawkerCentres)=>{
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
  })
})

//? seed hawkerstalls
//localhost:4000/v1/hawkers/stalls/seed
router.get("/stalls/seed", (req, res) => {
  HawkerStalls.remove({}, (err, hawkerStalls) => {
    HawkerStalls.create([
      {
        name: "No1 Maxwell",
        operating_hours: "0900 - 1800",
        closed_days: "Monday",
        unit_number: "01-01",
        score: 5,
        image_url: "https://cache-wak-wak-hawker-com.s3-ap-southeast-1.amazonaws.com/data/images/stall/64/864/block/LQO1R82f328jzczp.jpg?v=1612194949",
        // dishes: [{ type: Schema.Types.ObjectId, ref: "Dishes" }], //! Reference (DISH id)
        // hawker_centre: {type: Schema.Types.ObjectId, ref: "HawkerCentre"},
      },
      {
        name: "Traditional Chinese Claypot",
        operating_hours: "0900 - 1800",
        closed_days: "Monday",
        unit_number: "01-02",
        score: 10,
        image_url: "https://hawkerpedia.s3.ap-southeast-1.amazonaws.com/highlight-item/20201123/h1EP4JHfZvdp_RTmMYVaOsywA_traditionalchineseclaypot_sf.jpg",
        // dishes: [{ type: Schema.Types.ObjectId, ref: "Dishes" }], //! Reference (DISH id)
        // hawker_centre: {type: Schema.Types.ObjectId, ref: "HawkerCentre"},
      },
      {
        name: "Ah Tai Hainanese Chicken Rice",
        operating_hours: "1100 - 1930",
        closed_days: "Tuesday",
        unit_number: "01-07",
        score: 10,
        image_url: "https://cdn.foodadvisor.com.sg/1/400/tccrg/62pr1o64t583s4tp82o1804269/ah-tai-hainanese-chicken-rice-maxwell-food-centre.jpg",
        // dishes: [{ type: Schema.Types.ObjectId, ref: "Dishes" }], //! Reference (DISH id)
        // hawker_centre: {type: Schema.Types.ObjectId, ref: "HawkerCentre"},
      },
    ],
    (err, data)=>{
      res.redirect("/v1/hawkers")
    })
  });
});

//? delete a hawker centre
router.delete("/:id", (req,res)=>{
  HawkerCentre.findByIdAndRemove(req.params.id, (err, deletedCentre)=>{
    if(err){
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedCentre);
  })
})

//? update a hawker centre
router.put("/:id", (req,res)=>{
  HawkerCentre.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedCentre)=>{
      if(err){
        res.status(400).json({error: err.message});
      }
      res.status(200).json(updatedCentre)
    }
  )
})

//? delete a hawker stall 
router.delete("/:id", (req,res)=>{ //!not sure if should be /:hawkercentrename/:id ???
  HawkerStalls.findByIdAndRemove(req.params.id, (err, deletedStall)=>{
    if(err){
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedStall);
  })
})

//? update a hawker stall 
router.put("/:id", (req,res)=>{ //!not sure if should be /:hawkercentrename/:id ???
  HawkerStalls.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedStall)=>{
      if(err){
        res.status(400).json({error: err.message});
      }
      res.status(200).json(updatedStall)
    }
  )
})

module.exports = router;
