require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
