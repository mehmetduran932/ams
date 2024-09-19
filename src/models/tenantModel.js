const mongoose = require("mongoose");

const tenantModel = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    gsm: {type: String, required: true},
    mail: {type: String, required: true},
    isActive: {type: Boolean, required: true},
}, {collection: "Tenant", timestamps: true})

const tenant = mongoose.model("Tenant", tenantModel);


module.exports = tenant;