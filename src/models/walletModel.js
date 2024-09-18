const mongoose = require("mongoose");

const walletModel = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    inOrOutMoneyType:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    gsm: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
    }
}, {collection: "Wallet", timestamps: true});

const Wallet = mongoose.model("Wallet", walletModel);

module.exports = Wallet;