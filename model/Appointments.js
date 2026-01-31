const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month:{
    type:Number,
    required: true,
  },
  week:{
    type:Number,
    required: true,
  },
  identity: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  vaccine:{
    type:String,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  Patient_Id: {
    type: String,
    required: true,
  },
  Doctorid: {
    type: String,
    required: true,
  },
  dateofvisit: {
    type: String,
  },
  bloodpresure: {
    type: String,
  },
  bloodsugar: {
    type: String,
  },
  weight: {
    type: String,
  },
  temperature: {
    type: String,
  },
  fundalHeight: {
    type: String,
  },
  heartrate: {
    type: String,
  },
  fetalPosition: {
    type: String,
  },
  fetalHeartSound: {
    type: String,
  },
  fetalMovement: {
    type: String,
  },
  labTestFile: {
    type: String,
  },
  ultraSonicReport: {
    type: String,
  },
  stressTestFile: {
    type: String,
  },
  bloodTestFile: {
    type: String,
  },
  urineTestFile: {
    type: String,
  },
  isvisited: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Appointments", schema);
