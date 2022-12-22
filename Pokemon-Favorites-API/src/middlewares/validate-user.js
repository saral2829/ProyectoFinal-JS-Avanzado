const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateAccessToken(userExit) {
  return jwt.sign(userExit, process.env.SECRET /*, { expiresIn: "43800m" }*/);
}

function validateToken(req, res, next) {
  // const token = req.body.token;
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("No me enviaste el token.");
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      res.send("Me enviaste el token, pero no es valido o ha expirado.");
    } else {
      next();
    }
  });
}

module.exports = {
  generateAccessToken,
  validateToken,
};
