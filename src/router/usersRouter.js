const router = require("express").Router();
const usersService = require("../service/usersService");

router.post("/addUsers", usersService.addUsers);

router.get("/getAll", usersService.getAllUsers);

router.put("/updateIsActive/:id", usersService.updateUserIsActive)

router.put("/updateRole/:id", usersService.updateUserRole)

module.exports = router;
