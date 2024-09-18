const router = require("express").Router();

const rulesService=require("../service/rulesService");

router.post("/addRules",rulesService.addRules);
router.get("/getAll",rulesService.getAll);

module.exports = router;