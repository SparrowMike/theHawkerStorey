const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({});

module.exports = mongoose.model("Users", usersSchema);
