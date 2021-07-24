const mongoose = require("mongoose");
const Schema = mongoose.Schema

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  user_postal_code: { type: String },
  favourite_dishes: [String],
  posts_history: {type: Schema.Types.ObjectId, ref: "Posts"}, //! Reference (POSTS id)

  //! + cuisine that they like (query from DISHES cuisine)
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

