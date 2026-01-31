const express = require("express");
const router = express.Router();
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
const upload = require("../middlewares/upload");

router
  .route("/")
  .get(getallappointment)
  .post(
    upload.fields([
      { name: "labTestFile", maxCount: 1 },
      { name: "ultraSonicReport", maxCount: 1 },
      { name: "bloodTestFile", maxCount: 1 },
      { name: "stressTestFile", maxCount: 1 },
      { name: "urineTestFile", maxCount: 1 }
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
