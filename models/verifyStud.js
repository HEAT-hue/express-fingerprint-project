// jshint esversion:6
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerifyStudentSchema = new Schema({
  courseName: { type: "String" },
  regNum: { type: "String" },
});

VerifyStudentSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log("Duplicate keys");
    next(error);
  }
});

module.exports = mongoose.model("verifiedStudents", VerifyStudentSchema);
