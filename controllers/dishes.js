const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const Dishes = require("../models/dishes")

//? Gets all dishes 
//localhost:4000/v1/dishes/
router.get("/", (req, res) => {
  Dishes.find({}, (err, foundDishes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundDishes);
  });
});

// shows dish by ID
router.get("/:id", (req, res) => {
  const id = req.params.id
  Dishes.findById(id, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(post);
  });
});

// create a dish
router.post("/", (req, res) => {
  Dishes.create(req.body, (error, createdDish) => {
    if (error) {
      res.status(400).json({ error: error.message })
    } 
    res.status(200).send(createdDish)
  })
})

// delete a dish
router.delete("/:id", (req, res) => {
  Dishes.findByIdAndRemove(req.params.id, (err, deletedDish) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedDish);
  });
});

// update a dish
router.put("/:id", (req, res) => {
  Dishes.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedDish) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedDish);
    }
  );
});

module.exports = router;