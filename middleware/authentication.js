const jwt = require("jsonwebtoken");

const SECRET = require("../data/global.data");

module.exports = function (req, res, next) {
  //get the token from the header if present
  console.log("this is auth blogs");
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  console.log("this is token", token);
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
  console.log("middle ware");
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    return res.status(400).send("Invalid token.");
  }
};
