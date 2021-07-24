const mongoose = require("mongoose");
const Schema = mongoose.Schema

const hawkerStallsSchema = new Schema({
  name: { type: String, required: true },
  operating_hours: { type: String, required: true },
  closed_days: { type: String, required: true },
  unit_number: { type: String, required: true },
  score: { type: Number, default: 0 },
  image_url: { type: String },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dishes" }], //! Reference (DISH id)
  hawker_centre: {type: Schema.Types.ObjectId, ref: "HawkerCentre"}, //! Reference (HAWKER CENTRE id)

  //! + all user posts that reviewed stall (query from post_id)
});

const HawkerStalls = mongoose.model("HawkerStalls", hawkerStallsSchema);

module.exports = HawkerStalls;
