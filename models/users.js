const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  user_postal_code: { type: String },
  favourite_dishes: { Array },
  posts_history: { type: String }, //! Reference (POSTS id)

  //! + cuisine that they like (query from DISHES cuisine)
});

module.exports = mongoose.model("Users", usersSchema);
