// jshint esversion:6
// import model
const studModel = require("../models/student");
const regCourseModel = require("../models/regCourse");
const verifiedStudentsModel = require("../models/verifyStud");

// Get registration of students
// @ROUTE: desc: http://localhost:5000/AUTH?tagId=12&Cid=EEE414
const authStud = async (req, res, next) => {
  const { tagId, Cid } = req.query;

  // Get registration Number of given tagId
  const studData = await studModel.findOne({
    tagId: tagId,
  });

  // Check if student has registered course

  // Send registration number of verified student
  if (studData) {
    // Check if course has been registered
    const registeredCourse = await regCourseModel.findOne({
      regNum: studData.regNum,
      courseName: Cid,
    });
    if (registeredCourse) {
      const verifiedStudentData = await verifiedStudentsModel.findOne({
        regNum: studData.regNum,
        courseName: Cid,
      });

      if (!verifiedStudentData) {
        verifiedStudentsModel.create(
          {
            regNum: studData.regNum,
            courseName: Cid,
          },
          (error, doc) => {
            if (error) {
              return res.status(201).json({
                type: "RES",
                status: "FAIL",
                msg: "Ver Course Err",
              });
            }
          }
        );
      }
      return res.status(200).json({
        type: "RES",
        status: "OK",
        msg: "Auth Success...",
        Sid: studData.regNum,
      });
    } else {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "Stud Course Err",
        Sid: studData.regNum,
      });
    }
  }

  // else error response
  else {
    return res.status(400).json({
      type: "RES",
      status: "FAIL",
      msg: "SYS_ERROR",
    });
  }
};

module.exports = authStud;
