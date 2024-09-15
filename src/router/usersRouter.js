const router = require("express").Router();
const usersService=require("../service/usersService")

router.get("/getAll",(req,res)=>{
    res.send("users api")
})

router.post("/addUsers",usersService.addUsers)

module.exports=router