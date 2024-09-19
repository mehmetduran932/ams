const router = require("express").Router();

const typeService=require("../service/inOutMoneyTypesService");

router.post("/createInOutMoneyType", typeService.createType)
router.get("/getAllInOutMoneyTypes", typeService.getAll)

module.exports = router;