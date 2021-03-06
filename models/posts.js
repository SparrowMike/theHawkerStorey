const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  image_url: { type: String, required: true },
  cloudinary_id: String,
  hawkerCentre: { type: String, required: true },
  hawkerStall: { type: String, required: true },
  dishes_name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  posted_by: { type: Schema.Types.ObjectId, ref: "Users" }, //"Users" references User Schema
  username: {type: String, required: true}

  //! + hawker centre they are referring to (query from HAWKER CENTRE id)
  //! + hawker stall they are referring to (query from HAWKER STALL id)
  //! + dishes they are referring to (query from DISHES id)

  //! NEED TO RELOOK AT THIS ONE
});

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;

//liked_by: [String],
