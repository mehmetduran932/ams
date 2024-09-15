const mongoose = require("mongoose");

const announcementModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "Announcement", timestamps: true }
);

const announcement = mongoose.model("Announcement", announcementModel);

module.exports = announcement;
