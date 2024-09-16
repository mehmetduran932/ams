const router = require("express").Router();

const staffService = require("../service/staffService")


router.post("/addStaff", staffService.createStaff)

router.get("/getAll", staffService.getAll)

router.post("/findId", staffService.findId)

router.put("/updateStaff/:id", staffService.updateStaff)

module.exports = router;