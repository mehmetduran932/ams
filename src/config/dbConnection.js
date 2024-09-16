const mongoose=require("mongoose")
mongoose.connect(process.env.DB_CONNECTION_STRING)

.then(()=>{
    console.log("Db Bağlantısı Ok.")
})
.catch((err)=>{
    console.log("Db Bağlantısı Down." + err)
})