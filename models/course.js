// jshint esversion:6
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseId: { type: String, unique: true },
});

module.exports = mongoose.model("Courses", CourseSchema);
