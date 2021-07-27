const express = require("express");
const app = express();
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const Posts = require("../models/posts");
const session = require("express-session");
const { cloudinary } = require("../utils/cloudinary");

const sessionsController = require("./sessions");
app.use("/sessions", sessionsController);

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
//localhost:4000/v1/posts/:postsid
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(post);
  });
});

router.get("/seed", (req, res) => {
  Posts.create(
    [
      {
        image_url:
          "https://asianfoodnetwork.com/content/dam/afn/global/en/articles/5-must-try-food-in-one-of-singapore%27s-most-awarded-hawker-centers/curry%20mee.png",
        review: "awesome chicken curry",
        rating: "3",
        timestamp: new Date(),
        posted_by: "1234",
        liked_by: "1123",
        hc_id: "maxwell-123",
        hs_id: "tiantian-125125",
        dishes_id: "dish-chickenrice",
      },

      {
        image_url:
          "http://www.ricebowlasia.com/wp-content/uploads/2019/11/is-nasi-lemak-malaysian.jpg",
        review: "rice was a tad too dry and not lemak enoguh",
        rating: "1",
        timestamp: new Date(),
        posted_by: "1114",
        liked_by: "1293",
        hc_id: "maxwell-123",
        hs_id: "ahsengnasilemak-190125",
        dishes_id: "dish-nasilemak",
      },

      {
        image_url:
          "https://1.bp.blogspot.com/-js5g5f7grTE/XUA-mdQPiJI/AAAAAAAAPxU/BjGAIxYIfB4T8hsAenv_kYaGmBRPNKf8gCLcBGAs/s1600/Hor%2BFun%2BPremium%2B%2528Alexandra%2BVillage%2BFood%2BCentre%2529%2B-%2BMixed%2BSeafood%2BHor%2BFun.jpg",
        review: "tasty gravy so awesome",
        rating: "3",
        timestamp: new Date(),
        posted_by: "0034",
        liked_by: "1923",
        hc_id: "maxwell-123",
        hs_id: "yumhorfun-100125",
        dishes_id: "dish-beefhorfun",
      },
    ],
    (err, data) => {
      res.redirect("/v1/posts");
    }
  );
});

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

// create a post
//localhost:4000/v1/posts/new (ame: @potcheeks, changed the url to /new for authentication)
router.post("/new", isAuthenticated, (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdPost);
  });
});

//!dave post test
router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "hawkerstorey-preset",
    });
    // res.json({ msg: uploadedResponse });
    console.log("WE SENT IT TO THE CLOUD!!", uploadedResponse.url);
    console.log(req.body)
    //* Create new post
    const post = new Posts({
      image_url: uploadedResponse.url,
      cloudinary_id: uploadedResponse.public_id,
      hawkerCentre: req.body.hawkerCentre,
      hawkerStall: req.body.hawkerStall,
      // review: req.body.review,
      // rating: req.body.rating,
      // timestamp: new Date(),
      // posted_by: result.public_id, //! add user
      // dishes_id: req.body.dishname
    });
    // console.log(post);
    // await post.save();
    // res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

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
