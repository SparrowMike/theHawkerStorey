const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({});

module.exports = mongoose.model("Posts", postsSchema);
