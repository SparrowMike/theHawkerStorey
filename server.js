const express = require("express");
const dummy = require("./models/dummy.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
