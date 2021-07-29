const express = require("express");
const app = express();
const router = express.Router();
const Posts = require("../models/posts");
const Users = require("../models/users");
const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");
const session = require("express-session");
const { cloudinary } = require("../utils/cloudinary");

const upload = require("../utils/multer");

const sessionsController = require("./sessions");
app.use("/sessions", sessionsController);

require("dotenv").config();
const jwt = require("jsonwebtoken");

//*==============authenticate token middleware====================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(401); //no token received

  // process the secret we receive
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); //token no longer valid
    //user can now proceed
    req.user = user;
    next();
  });
};

//*=====================SHOW ALL THE POSTS=======================
router.get("/", (req, res) => {
  Posts.find({}, (err, foundPosts) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundPosts);
  });
});

//*======================FIND POST BY ID========================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(post);
  });
});

//*=================UPLOAD A SINGLE IMAGE========================
router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "hawkerstorey-preset",
    });
    console.log(
      "WE SENT IT TO THE CLOUD!!",
      uploadedResponse,
      req.body.user_id
    );
    //* Create new post
    let post = new Posts({
      image_url: uploadedResponse.secure_url,
      cloudinary_id: uploadedResponse.public_id,
      posted_by: req.body.user_id,
      username: req.body.username,
      hawkerCentre: req.body.hawkerCentre,
      hawkerStall: req.body.hawkerStall,
      review: req.body.review,
      rating: req.body.rating,
      dishes_name: req.body.dishes_name,
    });
    // this pushes the new post in the user's post history
    await post.save();
    console.log("postid", post._id);
    Users.findByIdAndUpdate(
      req.body.user_id,
      { $push: { posts_history: post._id } },
      { new: true },
      (err, foundUser) => res.json(post)
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

//*========================DELETE BY ID===========================
router.delete("/:id", async (req, res) => {
  try {
    // Find post by id
    let post = await Posts.findById(req.params.id);
    // Delete post from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    // Delete post from db
    await post.remove();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

//*=====================UPDATE THE POST=========================
// router.put("/:id", upload.single("image"), async (req, res) => {
router.put("/:id", async (req, res) => {
  try {
    const data = {
      review: req.body.review,
      rating: req.body.rating,
    };
    post = await Posts.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

module.exports = router;
