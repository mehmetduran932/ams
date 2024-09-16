const router = require("express").Router();

const cashService = require("../service/cashService");

router.post("/addCash", cashService.addCash)

router.get("/getCash", cashService.getAllCash)

router.get('/latest', cashService.getLastCash)

module.exports = router;