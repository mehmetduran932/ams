const router = require("express").Router();

const walletService = require("../service/walletService");


router.get("/getWallet", walletService.getWallet);

router.post("/addMoney", walletService.createWallet)

router.get("/getTotal",walletService.calculateBalance)

module.exports = router;