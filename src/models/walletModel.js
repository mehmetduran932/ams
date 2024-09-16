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
    }
}, {collection: "Wallet", timestamps: true});

const Wallet = mongoose.model("Wallet", walletModel);

module.exports = Wallet;