const mongoose = require("mongoose");

const hawkerCentreSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String }, //! Nested Object of String, required: True
  name: { type: String },

  //! + show all hawker stalls relating to  (query from post_id)
});

module.exports = mongoose.model("HawkerCentre", hawkerCentreSchema);
