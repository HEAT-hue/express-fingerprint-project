// jshint esversion:6
const mongoose = require("mongoose");

const courseModel = require("../models/course");

// Create course
// @ROUTE: POST desc: http://localhost:5000/createCourse?Cid=EEE387
const createCourse = async (req, res, next) => {
  const { Cid: courseId } = req.query;

  try {
    // Check if course exists
    const courseExists = await courseModel.findOne({
      courseId: courseId,
    });
    // Send error if course has been created already
    if (courseExists) {
      return res.json({
        status: "FAIL",
        msg: "Course has already been created",
        course: courseExists,
      });
    }

    // Create new Course Instance
    const course = await new courseModel({
      courseId: courseId,
    });

    // Save data
    const courseData = await course.save();

    return res.status(201).json({
      type: "RES",
      status: "OK",
      msg: "course created",
      course: courseData,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = createCourse;
