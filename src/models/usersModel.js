const mongoose = require("mongoose");

const usersModel = new mongoose.Schema(
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
      unique: true,
    },
    mail: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
  },
  { collection: "Users", timestamps: true }
);

const users = mongoose.model("Users", usersModel);

module.exports = users;
