const mongoose = require("mongoose");

const bankInfoModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    iban: {
        type: String,
        required: true,
    },
    isOutSource: {
        type: Boolean,
        required: true,
    }
})

const bank = mongoose.model("bank", bankInfoModel);

module.exports = bank;