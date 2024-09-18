const mongoose = require("mongoose");

const rulesModel = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
})


const rules = mongoose.model("Rules", rulesModel);

module.exports = rules;