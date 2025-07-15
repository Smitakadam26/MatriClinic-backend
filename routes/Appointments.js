const express = require("express");
const router = express.Router();
const path = require('path')
const {
  getappointment,
  getappointmentslots,
  postappointment,
  getpatientappoint,
  gettodaysappointments,
  editvisitstatus,
  editappointment,
  getallappointment,
  getdoctorappointments,
} = require("../controller/Appointment");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

var upload = multer({ storage: storage });

router
  .route("/")
  .get(getallappointment)
  .post(
    upload.fields([
      { name: "labtestfile", maxCount: 1 },
      { name: "ultrasonicreport", maxCount: 1 },
      { name: "bloodtestfile", maxCount: 1 },
      { name: "stresstestfile", maxCount: 1 },
      { name: "urinetestfile", maxCount: 1 }
    ]),
    postappointment

  );

router.route("/availability").get(getappointmentslots);
router.route("/todaysappointments").get(gettodaysappointments);
router.route("/patientapmnt").get(getpatientappoint);
router.route("/:id").get(getappointment).put(editvisitstatus).put(editappointment)
router.route("/editvisitstatus/:id").put(editvisitstatus)
router.route("/doctorappointment/:Doctorid").get(getdoctorappointments);

module.exports = router;
