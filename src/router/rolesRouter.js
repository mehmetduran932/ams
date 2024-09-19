const router = require("express").Router();
const rolesService=require("../service/rolesService");

router.get("/getRoles",rolesService.getRoles);

module.exports = router;