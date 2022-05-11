// jshint esversion:6
const router = require("express").Router();

const { FinalStudReg, InitStudReg } = require("../controllers/regStud");
const authStud = require("../controllers/authStud");

const { delStudDoc, delAllStud } = require("../controllers/delete");

const createCourse = require("../controllers/createCourse");
const regCourse = require("../controllers/regCourse");

const genPdf = require("../controllers/genPdf");

// TESTING ESP_POWER SUPPLY FROM ARDUINO

router.get("/HELLO", (req, res) => {
  res.send("Welcome from express Server");
  console.log("REQ from ESP sent");
});

// INITIAL REGISTRATION OF STUDENTS
// @ROUTE: POST desc: http://localhost:5000/PREG?Sid=2016030175035
// return { type: "RES", status: "OK"}
router.get("/PREG", InitStudReg);

// FINAL REGISTRATION OF STUDENTS
// @ROUTE: GET desc: http://localhost:5000/FREG?Sid=2016030175035&tagId=5
// return { type: "RES", status: "OK", msg: "Stud data saved"}
router.get("/FREG", FinalStudReg);

// VERIFICATION AND AUTHORIZATION OF STUDENTS
// @ROUTE: desc: http://localhost:5000/AUTH?tagId=12&Cid=EEE414
// return{type: "RES", status: "OK", msg: "Auth Success...", Sid: 2016030175034,}
router.get("/AUTH", authStud);

// DELETE A STUDENT
// @ROUTE: desc: http://localhost:5000/DELALL
router.get("/DELALL", delAllStud);

// CLEAR THE ENTIRE DB
// @ROUTE: desc: http://localhost:5000/DELONE?Sid=2016030175035
router.get("/DELONE", delStudDoc);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Course
// @ROUTE: POST desc: http://localhost:5000/createCourse?Cid=EEE387
router.post("/createCourse", createCourse);

// Register Course
// @ROUTE: POST desc: http://localhost:5000/regCourse?Sid=2016030175035&Cid=EEE387
router.post("/regCourse", regCourse);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Get PDF documents of verified students
// @ROUTE: GET desc: http://localhost:5000/getPdf?Cid=EEE313
router.get("/getPdf", async (req, res) => {
  const Cid = req.query.Cid;
  const pdf = await genPdf(Cid);
  res.set("Content-Type", "application/pdf");
  res.send(pdf);
});

module.exports = router;
