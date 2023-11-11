const jwt = require("jsonwebtoken");

// Middleware to check if the request has a valid JWT
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send({ status: false, msg: "Unauthorized: No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  
  jwt.verify(token, "MERN STACK", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ status: false, msg: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
