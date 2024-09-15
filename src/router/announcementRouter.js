const router = require("express").Router();
const announcementService=require("../service/announcementService")

router.post("/addAnnouncement",announcementService.createAnnouncement)

router.get("/getAll",announcementService.getAll)

router.post("/getActive",announcementService.isActiveList)

router.put("/updateAnnouncement/:id",announcementService.updateStatus)

module.exports = router;