//import
const verifyToken = require("./src/middleware/authMiddleware");
const authRouter = require("./src/router/authRouter");
const usersRouter = require("./src/router/usersRouter");
const announcementRouter = require("./src/router/announcementRouter");

// require
require("dotenv").config();
require("./src/config/dbConnection");

// constant
const express = require("express");
const server = express();
const port = process.env.DEV_PORT;

//express
server.use(express.json());

server.use((req, res, next) => {
  if (req.path === "/auth/login") {
    return next();
  }
  verifyToken(req, res, next);
});

// routers
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/announcement", announcementRouter);

server.get("/", (req, res) => {
  res.send("merhaba");
});

server.listen(port, () => {
  console.log("sunucu ayakta dinleniyor");
});