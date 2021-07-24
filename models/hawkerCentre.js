const mongoose = require("mongoose");

const hawkerCentreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {                                          //! Nested Object of String, required: True
    street_address: {type: String, required: true },
    postal_code: {type: Number, required: true}
   }, 
  description: { type: String },

  //! + show all hawker stalls relating to  (query from post_id)
});

const HawkerCentre = mongoose.model("HawkerCentre", hawkerCentreSchema);

module.exports = HawkerCentre
