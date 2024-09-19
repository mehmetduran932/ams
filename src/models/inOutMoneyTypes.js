const mongoose = require("mongoose");

const moneyTypes = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {collection: "InOutMoneyTypes", timestamps: true})

const type = mongoose.model("InOutMoneyTypes", moneyTypes);

module.exports = type;