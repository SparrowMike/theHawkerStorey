const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");

const dishes = require("./models/dishes.js");

require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.static("public"));

//! available on > http://localhost:4000/v1/posts
const postsController = require("./controllers/posts.js");
app.use("/v1/posts", postsController);

// const dishesController = require("./controllers/dishes.js");
// app.use("/v1/dishes", dishesController);

// const hawkerCentreController = require("./controllers/hawkerCentre.js");
// app.use("/v1/hawkerCentre", hawkerCentreController);

// const hawkerStallsController = require("./controllers/duhawkerStallsmmy.js");
// app.use("/v1/hawkerStalls", hawkerStallsController);

// const usersController = require("./controllers/users.js");
// app.use("/v1/users", usersController);

// const dishesController = require("./controllers/dishes.js");
// app.use("/v1/dishes", dishesController);

app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);

mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
