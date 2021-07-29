require("dotenv").config();
const jwt = require("jsonwebtoken");

//* authenticate token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(401); //no token received

  // process the secret we receive
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); //token no longer valid
    //user can now proceed
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
