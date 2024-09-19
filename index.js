//import
const verifyToken = require("./src/middleware/authMiddleware");
const authRouter = require("./src/router/authRouter");
const usersRouter = require("./src/router/usersRouter");
const announcementRouter = require("./src/router/announcementRouter");
const staffRouter = require("./src/router/staffRouter");
const walletRouter = require("./src/router/walletRouter");
const cashRouter = require("./src/router/cashRouter");
const rulesRouter = require("./src/router/rulesRouter");
const inOutTypeRouter = require("./src/router/inOutMoneyTypesRouter");
const tenantRouter = require("./src/router/tenantRouter");

// require
require("dotenv").config();
require("./src/config/dbConnection");
const cors = require('cors');

// constant
const express = require("express");
const server = express();
const port = process.env.DEV_PORT;

//express
server.use(express.json());

//cors
server.use(cors({
    origin: '*'
}));

server.use((req, res, next) => {
    if (req.path === "/auth/login" || req.path === "/users/addUsers") {
        return next();
    }
    verifyToken(req, res, next);
});

// routers
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/announcement", announcementRouter);
server.use("/staff", staffRouter);
server.use("/wallet", walletRouter)
server.use("/cash", cashRouter)
server.use("/rules", rulesRouter)
server.use("/inOutTypes", inOutTypeRouter)
server.use("/tenant", tenantRouter)

server.get("/", (req, res) => {
    res.send("merhaba");
});

server.listen(port, () => {
    console.log("sunucu ayakta dinleniyor");
});
