const mongoose = require("mongoose");
const { error } = require("node:console");
const { createHmac, randomBytes } = require("node:crypto");
const { createtoken } = require("../services/authentication");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  Doctorid: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  nationality: {
    type: String,
  },
  matricalStatus: {
    type: String,
  },
  doctor: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  identity: {
    type:Number,
    required:true,
  },
  age: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  menstrualstopdate: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  profileimageurl: {
    type: String,
    default: "/images/usericon.jpeg",
  },
  salt: {
    type: String,
  },
});
schema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;
  next();
});
schema.static("updatedpassword", async function (email, password) {
  const user = await this.findOne({ email });

  user.password = password;
  await user.save();
  return user;
});
schema.static("matchpassword", async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  const salt = user.salt;
  const hashedpassword = user.password;

  const userprovidedpassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedpassword === userprovidedpassword) {
    const token = createtoken(user);
    return token;
  }
});
module.exports = mongoose.model("Patient", schema);
                                                                                                 