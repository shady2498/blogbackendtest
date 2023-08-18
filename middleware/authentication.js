const jwt = require("jsonwebtoken");

const SECRET = require("../data/global.data")


module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
    console.log("middle ware")
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    return res.status(400).send("Invalid token.");
  }
};