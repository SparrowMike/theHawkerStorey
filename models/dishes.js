const mongoose = require("mongoose");

const dishesSchema = mongoose.Schema({
  dish_name: { type: String },
  cuisine: { type: String },
  
});

module.exports = mongoose.model("Dishes", dishesSchema);
