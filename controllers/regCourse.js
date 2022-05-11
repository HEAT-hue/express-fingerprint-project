// jshint esversion:6
const courseModel = require("../models/course");
const regCourseModel = require("../models/regCourse");
const studModel = require("../models/student");

// Student's coure registration
// @ROUTE: POST desc: http://localhost:5000/regCourse?Sid=2016030175035&Cid=EEE414
module.exports = async (req, res, next) => {
  // const { Sid, Cid } = req.query;

  const Sid = req.query.Sid;

  const Cid = req.query.Cid;

  // Check if course has been created
  const courseExists = await courseModel.findOne({
    courseId: Cid,
  });

  // // Send error if course has been created already
  if (!courseExists) {
    return res.json({
      status: "FAIL",
      msg: "Course not yet Created",
      course: courseExists,
    });
  }

  // Check if student exists
  const studentExists = await studModel.findOne({ regNum: Sid });

  if (!studentExists) {
    return res.json({
      status: "FAIL",
      msg: "You are not yet registered!",
      course: courseExists,
    });
  }

  // Check if course has been registered before
  const registeredCourse = await regCourseModel.findOne({
    regNum: Sid,
    courseId: courseExists._id,
  });

  if (!registeredCourse) {
    regCourseModel.create(
      {
        regNum: Sid,
        courseId: courseExists._id,
        courseName: courseExists.courseId,
      },
      (error, doc) => {
        if (error) {
          return res.status(201).json({
            type: "ERROR",
            status: "FAIL",
            msg: "Mongoose Index Error",
          });
        }
        console.log(doc);
      }
    );
  }

  return res.status(200).json({
    status: "OK",
    msg: "You have successfully registered your courses!",
  });
};
