const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  image_url: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { Date },
  posted_by: { Date }, //! Reference (USERS id)

  //! + hawker centre they are referring to (query from HAWKER CENTRE id)
  //! + hawker stall they are referring to (query from HAWKER STALL id)
  //! + dishes they are referring to (query from DISHES id)

  //! NEED TO RELOOK AT THIS ONE
});

module.exports = mongoose.model("Posts", postsSchema);
