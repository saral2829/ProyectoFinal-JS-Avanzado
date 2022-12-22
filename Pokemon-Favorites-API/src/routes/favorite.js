const express = require("express");
const userSchema = require("../models/user");
const { validateToken } = require("../middlewares/validate-user.js");

const router = express.Router();

// Obtener los favoritos de usuario
router.get("/users/:userId/favorites", validateToken, (req, res) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((data) => res.json(data.favorites))
    .catch((error) => res.json({ message: error }));
});

// Agregar un favorito
router.post("/users/:userId/favorites", validateToken, (req, res) => {
  const { userId } = req.params;
  const { pokemonName, pokemonId } = req.body;

  userSchema
    .updateOne(
      { _id: userId },
      {
        $addToSet: { favorites: { name: pokemonName, id: pokemonId } },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un favorito
router.delete(
  "/users/:userId/favorites/:pokemonId",
  validateToken,
  (req, res) => {
    const { userId, pokemonId } = req.params;

    userSchema
      .updateOne({ _id: userId }, { $pull: { favorites: { id: pokemonId } } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
);

module.exports = router;
