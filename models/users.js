const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", usersSchema);
