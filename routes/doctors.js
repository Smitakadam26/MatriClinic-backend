const express = require('express')
const router = express.Router();
const { getdoctors,postdoctor, getdoctorbyId } = require("../controller/doctors");

router
    .route('/')
    .get(getdoctors)
    .post(postdoctor)


router.route('/:id').get(getdoctorbyId)

module.exports=router;