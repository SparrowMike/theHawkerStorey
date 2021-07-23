const mongoose = require("mongoose");

const dishesSchema = mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },

  //! + hawker stall name (query from hs_id)
  //! + hawker centre name (query from hc_id)
});

module.exports = mongoose.model("Dishes", dishesSchema);
