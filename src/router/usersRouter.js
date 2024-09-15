const router = require("express").Router();
const usersService = require("../service/usersService");

router.post("/addUsers", usersService.addUsers);

router.get("/getAll", usersService.getAllUsers);

module.exports = router;
