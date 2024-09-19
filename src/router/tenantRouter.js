const router = require("express").Router();

const tenantService = require("../service/tenantService");

router.post("/addTenant", tenantService.tenantCreate)

router.put("/updateTenant/:id", tenantService.updateTenant)

router.get("/getAll", tenantService.getAllTenant)

module.exports = router;