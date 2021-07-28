//* =======================================
//*              DEPENDENCIES
//* =======================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");
const path = require("path");

//* =======================================
//*              CONFIGURATIONS
//* =======================================
require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

//* =======================================
//*        BODY PARSER, MIDDLEWARE
//* =======================================
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use(express.static("./client/build"));
// const methodOverride = require("method-override");

//* =======================================
//*            MONGOOSE CONNECTION
//* =======================================
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

//* =======================================
//*         AUTHENTICATION
//* =======================================
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

//* =======================================
//*         CONTROLLERS/ROUTES
//* =======================================
const postsController = require("./controllers/posts.js");
app.use("/v1/posts", postsController); //only users can post

const hawkersController = require("./controllers/hawkers");
app.use("/v1/hawkers", hawkersController);

const dishesController = require("./controllers/dishes.js");
app.use("/v1/dishes", dishesController);

const usersController = require("./controllers/users.js");
app.use("/v1/users", usersController);

const sessionController = require("./controllers/sessions");
app.use("/v1/sessions", sessionController);

//* =======================================
//*              LISTENER
//* =======================================
app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
