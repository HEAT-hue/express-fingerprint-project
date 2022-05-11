// jshint esversion:6
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegCourseSchema = new Schema({
  courseName: { type: "String" },
  regNum: { type: "String" },
  courseId: { type: mongoose.Schema.Types.ObjectId },
});

RegCourseSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log("Multiple keys");
    next(error);
  }
});

module.exports = mongoose.model("CourseRegistrations", RegCourseSchema);
