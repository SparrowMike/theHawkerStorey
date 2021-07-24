const express = require("express");
const router = express.Router();
const Posts = require("../models/posts")
const { cloudinary } = require('../utils/cloudinary')

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/seed", (req, res) => {
  Posts.create(
    [
      {
        image_url: "https://asianfoodnetwork.com/content/dam/afn/global/en/articles/5-must-try-food-in-one-of-singapore%27s-most-awarded-hawker-centers/curry%20mee.png",
        review: "awesome chicken curry",
        rating: "3",
        timestamp: new Date(),
        posted_by: "1234",
        liked_by: "1123",
        hc_id: "maxwell-123",
        hs_id: "tiantian-125125",
        dishes_id: "dish-chickenrice"
      },

      {
        image_url: "http://www.ricebowlasia.com/wp-content/uploads/2019/11/is-nasi-lemak-malaysian.jpg",
        review: "rice was a tad too dry and not lemak enoguh",
        rating: "1",
        timestamp: new Date(),
        posted_by: "1114",
        liked_by: "1293",
        hc_id: "maxwell-123",
        hs_id: "ahsengnasilemak-190125",
        dishes_id: "dish-nasilemak"
      },

      {
        image_url: "https://1.bp.blogspot.com/-js5g5f7grTE/XUA-mdQPiJI/AAAAAAAAPxU/BjGAIxYIfB4T8hsAenv_kYaGmBRPNKf8gCLcBGAs/s1600/Hor%2BFun%2BPremium%2B%2528Alexandra%2BVillage%2BFood%2BCentre%2529%2B-%2BMixed%2BSeafood%2BHor%2BFun.jpg",
        review: "tasty gravy so awesome",
        rating: "3",
        timestamp: new Date(),
        posted_by: "0034",
        liked_by: "1923",
        hc_id: "maxwell-123",
        hs_id: "yumhorfun-100125",
        dishes_id: "dish-beefhorfun"
      },

    ],
    (err, data) => {
      res.redirect("/v1/posts");
    }
  );
});


//! dave imageUploader test


module.exports = router;