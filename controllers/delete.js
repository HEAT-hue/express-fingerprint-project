// jshint esversion:6
// import model
const studModel = require("../models/student");
const regCourseModel = require("../models/regCourse");
const verifiedStudentsModel = require("../models/verifyStud");

// Delete entire database
// @ROUTE: desc: http://localhost/5000:DELONE?Sid=2016030175035
const delStudDoc = async (req, res, next) => {
  // Get the index to find student
  const { Sid } = req.query;

  const studentExists = studModel.findOne({ regNum: Sid }, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "Couldn't delete.",
      });
    }
  });

  if (!studentExists) {
    return res.status(200).json({
      type: "RES",
      status: "FAIL",
      msg: "Stud not found.",
    });
  }

  console.log("Student exists");
  console.log(studentExists);

  regCourseModel.findOneAndDelete({ regNum: Sid }, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "CLEAR RDB FAIL",
      });
    }
  });

  verifiedStudentsModel.findOneAndDelete({ regNum: Sid }, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "CLEAR RDB FAIL",
      });
    }
  });

  // Check if student exists in the data base
  studModel.findOneAndDelete({ regNum: Sid }, (err, doc) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "Couldn't delete.",
      });
    }
    if (doc) {
      return res.status(200).json({
        type: "RES",
        status: "OK",
        tagId: doc.tagId,
      });
    } else {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "Stud not found.",
      });
    }
  });
};

// @ROUTE: desc: http://localhost:5000/DELALL
const delAllStud = async (req, res, next) => {
  // Clear from registration collection
  studModel.deleteMany({}, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "CLEAR SDB FAIL",
      });
    }
  });
  // Clear from course registration
  regCourseModel.deleteMany({}, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "CLEAR RDB FAIL",
      });
    }
  });
  // Clear from verification collection
  verifiedStudentsModel.deleteMany({}, (err) => {
    if (err) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "CLEAR DB FAIL",
      });
    }
  });
  return res.status(200).json({
    type: "RES",
    status: "OK",
  });
};

module.exports.delStudDoc = delStudDoc;
module.exports.delAllStud = delAllStud;
