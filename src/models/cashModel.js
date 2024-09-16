const mongoose = require("mongoose");

const cashModel = new mongoose.Schema({
    case: {
        type: Number,
        required: true
    },
    gsm: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
    }
}, {collection: "Cash", timestamps: true})

const cash = mongoose.model("Cash", cashModel);

module.exports = cash;