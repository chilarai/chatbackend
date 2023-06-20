const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const userRoutes = require("./router/user");
const chatRoutes = require("./router/chat");
const cors = require("cors");
require('dotenv').config()

InitiateMongoServer();

const app = express();
app.use(cors());

// middleware
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// router
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

// Start the server
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server Started at PORT ${process.env.PORT}`);
});