const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },

  //! + hawker stall name (query from hs_id)
  //! + hawker centre name (query from hc_id)
});

const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = Dishes;
