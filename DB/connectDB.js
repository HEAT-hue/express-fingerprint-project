// jshint esversion:6
const mongoose = require("mongoose");

require("dotenv").config();

// connect to local DB
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("DB connnected");
    });
  } catch (error) {
    handleError(error);
  }
};
