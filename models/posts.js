const mongoose = require("mongoose");


const postsSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  posted_by: { type: Schema.Types.ObjectId, ref: "Users"}, //"Users" references User Schema
  liked_by: String,
  hc_id: String,
  hs_id: String,
  dishes_id: String,

  //! + hawker centre they are referring to (query from HAWKER CENTRE id)
  //! + hawker stall they are referring to (query from HAWKER STALL id)
  //! + dishes they are referring to (query from DISHES id)

  //! NEED TO RELOOK AT THIS ONE
});

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
