const mongoose = require("mongoose");
const Schema = mongoose.Schema

const hawkerCentreSchema = new Schema({
  name: { type: String, required: true },
  address: {                                          //! Nested Object of String, required: True
    street_address: {type: String, required: true },
    postal_code: {type: String, required: true} //! Numbers leading with 0 can't be used as a number field
   }, 
  description: { type: String },
  hawker_stalls: [{type: Schema.Types.ObjectId, ref: "HawkerStalls"}]
  //! + show all hawker stalls relating to  (query from post_id)
});

const HawkerCentre = mongoose.model("HawkerCentre", hawkerCentreSchema);

module.exports = HawkerCentre

//hawker_stalls: {type: Schema.Types.ObjectId, ref: "HawkerStalls"}