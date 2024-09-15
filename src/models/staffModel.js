const mongoose = require("mongoose");

const staffModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    gsm: {
      type: Number,
      required: true,
    },
    duty: {
      type: String,
      required: true,
    },
    isOutSource: {
      type: Boolean,
      required: false,
    },
    outSourceGsm: {
      type: Number,
      required: false,
    },
    outSourceCompanyName: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "Staff", timestamps: true }
);

const staff = mongoose.model("Staff", staffModel);

module.exports = staff;
