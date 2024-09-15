const router = require("express").Router();

const authService = require("../service/authService");

router.post("/login", authService.loginService);

module.exports = router;
