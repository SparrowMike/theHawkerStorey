// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");
const path = require("path");

// =======================================
//              CONFIGURATIONS
// =======================================
require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

// =======================================
//        BODY PARSER, MIDDLEWARE
// =======================================
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
const methodOverride = require("method-override");

// =======================================
//            MONGOOSE CONNECTION
// =======================================
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

// =======================================
//         CONTROLLERS/ROUTES
// =======================================
//! available on > http://localhost:4000/v1/posts
const postsController = require("./controllers/posts.js");
app.use("/v1/posts", postsController);

const hawkersController = require("./controllers/hawkers");
app.use("/v1/hawkers", hawkersController);

const dishesController = require("./controllers/dishes.js");
app.use("/v1/dishes", dishesController);

const usersController = require("./controllers/users.js");

app.use("/v1/users", usersController);

// =======================================
//              LISTENER
// =======================================
//! temporary area for testing cloudinary upload.
//! to change fetch route in ImageUpload.js when we move the code from server.js to posts controller
app.get("/");

app.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    fileStr = cloudinary.api.add_metadata_field({
      external_id: "<INSERT post-id>",
      label: "cuisine?",
      datasource: {
        values: {
          hawkerCentre: "hawkerCentre",
          username: "username",
        },
      },
    });
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "hawkerstorey-preset",
    });
    res.json({ msg: uploadedResponse });
    console.log("WE SENT IT TO THE CLOUD!!");
    //! to pass this url into mongo
    console.log(uploadedResponse.url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
