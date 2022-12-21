const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user.js");
const favoriteRoutes = require("./routes/favorite.js");

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", favoriteRoutes);

// Mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conentado a mangodb Atlas"))
  .catch((error) => {
    console.error(error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("pagina de login");
});

// app.post("/auth", (req, res) => {
//   const { user, pass } = req.body;

//   const userReg = { user: user };

//   const accessToken = generateAccessToken(userReg);

//   res.header("authorization", accessToken).json({
//     message: "Usuario autenticado",
//     token: accessToken,
//   });
// });

// function generateAccessToken(userReg) {
//   return jwt.sign(userReg, process.env.SECRET, { expiresIn: "5m" });
// }

app.listen(port, () => console.log("Server listening on port", port));
