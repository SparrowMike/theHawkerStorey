const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const Posts = require("../models/posts")


//localhost:4000/v1/posts -> shows all the posts from different users
router.get("/", (req, res) => {
  Posts.find({}, (err, foundPosts) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundPosts);
  });
});

// shows post by ID
router.get("/:id", (req, res) => {
  const id = req.params.id
  Posts.findById(id, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(post);
  });
});

// create a post
router.post("/", (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    if (error) {
      res.status(400).json({ error: error.message })
    } 
    res.status(200).send(createdPost)
  })
})

// delete a post
router.delete("/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedPost);
  });
});

// update a post
router.put("/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedPost);
    }
  );
});


module.exports = router;