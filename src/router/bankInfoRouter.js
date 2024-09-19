const router = require("express").Router();

const bankService = require("../service/bankInfoService");

router.post("/addBankInfo",bankService.addBankInfo);

router.post("/getIbanList",bankService.getIbanList);

module.exports = router;