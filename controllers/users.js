const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

//? Gets all user profiles
//localhost:4000/v1/users/
router.get("/", (req, res) => {
  Users.find({}, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundUsers);
  });
});

//? seed the users
//localhost:4000/v1/users/seed
router.get("/seed", (req, res) => {
  Users.create(
    [
      {
        username: "potcheeks",
        password: "1234",
        email: "charrmaine@gmail.com",
        user_postal_code: "437898",
        favourite_dishes: ["wanton noodles", "roast pork rice"],
        dish_cuisine: ["chinese", "chinese"],
        posts_history: ["60fbbae99ad5dd658ff44cca", "60fbbae99ad5dd658ff44ccb"], //! Reference (POSTS id)
        liked_posts: "60fbbae99ad5dd658ff44ccb",
      },
      {
        username: "sugarplay",
        password: "1234",
        email: "fayfey@gmail.com",
        user_postal_code: "437898",
        favourite_dishes: ["roti prata", "carbonara"],
        dish_cuisine: ["indian", "western"],
        posts_history: "60fbbae99ad5dd658ff44ccc", //! Reference (POSTS id)
        liked_posts: "60fbbae99ad5dd658ff44ccc",
      },
    ],
    (err, data) => {
      res.redirect("/v1/users");
    }
  );
});

// shows user by ID
//localhost:4000/v1/users/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findOne({ _id: id })
    .populate("posts_history")
    .exec(function (err, Users) {
      console.log("users: ", Users);
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).json(Users);
    });
});

// create a user (ame: @potcheeks, I changed from post to user)
// generates hash for user's password
//localhost:4000/v1/users/
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    //hashSync: return after hashing
    req.body.password,
    bcrypt.genSaltSync(10) //genSaltSync: generate such that it differs for each user. Number can be changed. Prevents other servers from seeing the same hash/
  );
  Users.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdUser);
    // res.redirect("/v1/users");
  });
});

// delete a user(ame: @potcheeks, I changed from post to user)
router.delete("/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

// update a post
router.put("/:id", (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUser);
    }
  );
});
module.exports = router;
