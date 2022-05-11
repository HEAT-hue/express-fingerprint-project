// jshint esversion:6

// import model
const studModel = require("../models/student");

// Initial registration of students
// @ROUTE: desc: "http://localhost:5000/PREG?Sid=2016030175035
const InitStudReg = async (req, res, next) => {
  const { Sid } = req.query;

  try {
    // Check if registration number has been used
    const regNumExists = await studModel.findOne({
      regNum: Sid,
    });
    // Send error response here if reg number already registered
    if (regNumExists) {
      return res.status(200).json({
        type: "RES",
        status: "FAIL",
        msg: "Reg number used.",
      });
    }

    // else send success response to go ahead with final registration
    else {
      return res.status(200).json({
        type: "RES",
        status: "OK",
      });
    }
  } catch (e) {
    next(e);
  }
};

// Final registration of students
// @ROUTE: desc: http://localhost/5000:FREG?Sid=2016030175035&tagId=12
const FinalStudReg = async (req, res, next) => {
  const { name, tagId, Sid } = req.query;

  try {
    // Continue registration after passing pre registration checks

    // Create new student instance
    const student = await new studModel({
      name,
      tagId,
      regNum: Sid,
    });

    // Save student data
    const studData = await student.save();

    return res.status(200).json({
      type: "RES",
      status: "OK",
      msg: "Stud data saved",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.FinalStudReg = FinalStudReg;
module.exports.InitStudReg = InitStudReg;
