const express = require("express")
const router = express.Router();
const { getexercises} = require("../controller/exercise");

router.route('/').get(getexercises)
module.exports=router;