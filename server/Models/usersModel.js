const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    packID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pack",
    },
    activationDateVip: {
      type: Date,
    },
    endDateVip: {
      type: Date,
    },
    watchHistory: {
      type: Array,
    },
    role1: {
      name: {
        type: String,
        default: "role 1",
      },
      pin: {
        type: String,
        default: "1234",
      },
    },
    role2: {
      name: {
        type: String,
        default: "role 2",
      },
      pin: {
        type: String,
        default: "1234",
      },
    },
    resetPasswordCode: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    knownDevices: [
      {
        browser: String,
        os: String,
        device: String,
        ip: String,
        location: String,
        deviceId: String,
      },
    ],
  },
  { timestamps: true }
);

const users = mongoose.model("users", usersSchema);
module.exports = users;