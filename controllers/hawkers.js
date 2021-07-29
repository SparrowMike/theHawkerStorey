const express = require("express");
const router = express.Router();
const {StatusCodes} = require("http-status-codes");
const HawkerStalls = require("../models/hawkerStalls");
const HawkerCentre = require("../models/hawkerCentre");


//? Gets all hawker centres
//localhost:4000/v1/hawkers
router.get("/", (req, res) => {
  HawkerCentre.find({}).populate("hawker_stalls").
  exec(function (err, HawkerCentre){
    console.log(HawkerCentre)
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } 
    res.status(StatusCodes.OK).json(HawkerCentre)
  });
});


//? Gets all hawkerstalls from all hawker centres
//localhost:4000/v1/hawkers/stalls
router.get("/stalls", (req, res)=> { 
  HawkerStalls.find({}, (err, hawkerStalls)=>{
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    console.log("HS: ", hawkerStalls)
    res.status(StatusCodes.OK).json(hawkerStalls);
  })
})

//? seed hawker centres
//localhost:4000/v1/hawkers/seed
// router.get("/seed", (req,res)=> {
//     HawkerCentre.create(
//       [
//       {
//         name: "Maxwell Food Centre",
//         address: {
//           street_address: "1, Kadayanallur Street",
//           postal_code: "069184",
//         },
//         description: "We wouldn’t believe anyone who say they haven’t been here, but if you really haven’t, here are the highlights from Singapore’s favourite tourist-approved hawker centre. Starting with Tian Tian Chicken Rice (Anthony Bourdain-approved, mind you), you should take note of other favourites like Zhen Zhen Porridge, and Maxwell Fuzhou Oyster Cake.",
//         hawker_stalls: ["60fed3ff33402a7cacabf111", "60fed3ff33402a7cacabf112", "60fed3ff33402a7cacabf113", "610146163d28e192ab8f7a21", "610146163d28e192ab8f7a23", "610146c8563ac092c630ead1"]
//     },
//     {
//       name: "Adam Road Food Centre",
//       address: {
//         street_address: "2, Adam Road",
//         postal_code: "289877",
//       },
//       description: "Small but mighty, Adam Road FC counts famous stalls such as Selera Nasi Lemak as tenants.",
//       hawker_stalls:["60fed3ff33402a7cacabf114", "61014b7f5ef1129384bca666", "61014b7f5ef1129384bca667" ]
//   }
//     ],
//     (err, data)=>{
//       res.redirect("/v1/hawkers")
//     })
// })

// ? Gets all hawkerstalls in hawker centre
// localhost:4000/v1/hawkers/maxwell-food-centre
router.get("/:centreName/", (req, res)=> { 
  const centreName = req.params.centreName;
  console.log(centreName)
  HawkerCentre.findOne({name: centreName}).populate("hawker_stalls").
  exec(function (err, HawkerCentre){
    console.log(HawkerCentre)
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } 
    res.status(StatusCodes.OK).json(HawkerCentre)
  });
  })


//? seed hawkerstalls
//localhost:4000/v1/hawkers/stalls/seed
router.get("/stalls/seed", (req, res) => {
    HawkerStalls.create([
      {
        name: "Maxwell Fuzhou Oyster Cake",
        operating_hours: "0900 - 2000",
        closed_days: "Sunday",
        unit_number: "01-05",
        score: 10,
        image_url:
          "https://res.klook.com/image/upload/activities/huzuuwf3pvy2xmresuna.jpg",
        dishes: ["60fc155e5dd1ad70705c6f32"],
      },
      {
        name: "Stall 22 Hokkien Mee",
        operating_hours: "1000 - 2300",
        closed_days: "Monday",
        unit_number: "01-22",
        score: 7,
        image_url:
          "https://www.misstamchiak.com/wp-content/uploads/2018/12/DSCF5515-6-1300x867.jpg",
        dishes: ["6101131b908984874f998022" ],
      },
   
    ],
    (err, data)=>{
      res.redirect("/v1/hawkers/stalls")
    })
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
router.put("/:id", (req,res)=>{ //id = hawker centre id
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

router.post("/", (req, res) => {
  HawkerCentre.create(req.body, (error, createdHC) => {
    if (error) {
      res.status(400).json({ error: error.message })
    } 
    res.status(200).send(createdHC)
  })
})


//? delete a hawker stall 
router.delete("/:id", (req,res)=>{ 
  HawkerStalls.findByIdAndRemove(req.params.id, (err, deletedStall)=>{
    if(err){
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedStall);
  })
})

//? update a hawker stall 
router.put("/:id", (req,res)=>{ 
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
