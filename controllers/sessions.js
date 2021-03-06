const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//localhost:4000/v1/sessions
router.get("/", (req, res) => {
  res.send("sessions");
});

//new form to log in
//localhost:4000/v1/sessions/new
router.get("/new", (req, res) => {
  res.send("Log in page");
});

//create a new session
//* Authenticate User by password first, then generate JWT
router.post("/", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  Users.findOne(
    {
      username: username, //finds username first
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
        res.send("oops the db had a problem");
      } else if (!foundUser) {
        // if found user is undefined/null not found etc
        res.send("Sorry, no user found");
        // res.status(404);
      } else {
        console.log("user is found yay!");
        // now let's check if passwords match
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          // add the user to our session
          // console.log("password match. user is ", foundUser);
          req.session.currentUser = foundUser;
          const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY);
          // console.log("created ", accessToken);
          res.status(200).json({
            accessToken: accessToken,
            user_id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            posts_history: foundUser.posts_history,
            logged_in: true,
          });
        } else {
          // passwords do not match
          res.send("password does not match");
          // res.status(401);
        }
      }
    }
  );
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
