const router = require("express").Router();
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Posts = require("../models/posts");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("results", result);
    // Create new post
    let post = new Posts({
      image_url: result.secure_url,
      review: result.public_id,
      rating: 432,
      // timestamp: ,
      posted_by: result.public_id,
      dishes_id: result.public_id,
    });
    // Save user
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

// input type = file name = "image" //! for front end ~13:00

module.exports = router;
