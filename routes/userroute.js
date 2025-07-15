const express = require("express")
const router = express.Router();
const { getusers, postuser, getuserbyId, edituserbyid, signin, logout, getpatientsappointsdoctor, forgetpassword, resetpassword } = require("../controller/user");

router
    .route('/')
    .get(getusers)
    .post(postuser)
router.route('/:id').get(getuserbyId).put(edituserbyid)
router.route('/patientsappointsdoctor/:Doctorid').get(getpatientsappointsdoctor)
router.route('/login').post(signin)
router.route('/logout').get(logout)
router.route('/forgetpassword').post(forgetpassword)
router.route('/resetpassword/:id/:token').post(resetpassword)
module.exports=router;