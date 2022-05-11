// jshint esversion:6
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  tagId: { type: Number, min: 1, max: 80, unique: true },
  regNum: { type: "String", unique: true },
});

StudentSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log("Duplicate keys");
    next(error);
  }
});

module.exports = mongoose.model("Student", StudentSchema);
