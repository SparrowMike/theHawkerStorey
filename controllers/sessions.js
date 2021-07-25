const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const Users = require("../models/users");

//localhost:4000/v1/sessions
router.get("/", (req, res)=> {
  res.send("sessions")
})

//new form to log in
//localhost:4000/v1/sessions/new
router.get("/new", (req,res)=>{
  res.send("Log in page");
})

//create a new session
router.post("/", (req,res)=>{
  Users.findOne({
    username: req.body.username, //finds username first
   },
    (err, foundUser)=>{
      if (err) {
        console.log(err);
        res.send("oops the db had a problem");
      } else if (!foundUser) {
        // if found user is undefined/null not found etc
        res.send("Sorry, no user found");
      } else {
        // user is found yay!
        // now let's check if passwords match
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          // add the user to our session
          req.session.currentUser = foundUser;
          // redirect back to our home page
          res.redirect("/posts");
        } else {
          // passwords do not match
          res.send("password does not match");
        }
    }
  });
});

router.delete("/", (req,res)=>{
  req.session.destroy(()=>{
    res.redirect("/");
  });
});

module.exports = sessions