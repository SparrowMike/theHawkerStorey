const mongoose = require("mongoose");

const hawkerCentreSchema = mongoose.Schema({
  name_of_centre: {{type: String, required: true}}
});

module.exports = mongoose.model("HawkerCentre", hawkerCentreSchema);
