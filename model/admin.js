const mongoose = require("mongoose");
const {createHmac,randomBytes} = require('node:crypto');
const { createtoken } = require("../services/authentication");
const schema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  mobileNumber: {
    type:String,
    required:true,
  },
  email: {
    type:String,
    required:true,
  },
  dateOfBirth: {
    type:String,
    required:true,
  },
  salt:{
        type:String,
    }
});
schema.pre("save", function (next) {
  const admin = this;
  if (!admin.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(admin.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;

  next();
});

schema.static("matchpassword", async function (email, password) {
  const admin = await this.findOne({ email });
  console.log(admin);
  const salt = admin.salt;
  const hashedpassword = admin.password;

  const adminprovidedpassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedpassword === adminprovidedpassword) {
    const token = createtoken(admin);
    return token;
  }
});

module.exports = mongoose.model("Admin", schema);
