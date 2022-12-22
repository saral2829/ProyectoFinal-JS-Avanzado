const express = require("express");
const userSchema = require("../models/user");
const {
  validateToken,
  generateAccessToken,
} = require("../middlewares/validate-user.js");

const router = express.Router();

// create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", validateToken, (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", validateToken, (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", validateToken, (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Login
router.post("/login", (req, res) => {
  const { user, pass } = req.body;

  userSchema.findOne({ user: user, pass: pass }, (error, user) => {
    if (!user || error) {
      return res.send("Usuario y contaraseña no valido");
    }

    const accessToken = generateAccessToken({
      user: user.user,
      name: user.name,
      email: user.email,
    });

    res.header("authorization", accessToken).json({
      message: "Usuario autenticado",
      token: accessToken,
      userId: user._id,
    });
  });
});

module.exports = router;
