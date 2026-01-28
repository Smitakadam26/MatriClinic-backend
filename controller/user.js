const Patient = require("../model/Patient");
let nodemailer = require('nodemailer');
const { createtoken, validationtoken } = require("../services/authentication");
async function getusers(req, res) {
  try {
    const users = await Patient.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); 
    res.status(500).json({ error: error.message });
  }
}
async function postuser(req, res) {
  try {
    console.log("Request body:", req.body);
    const newUser = new Patient(req.body);
    const result = await newUser.save();
    console.log("Patient Register:", result);
    res
      .cookie("token", result, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        patient: {
          id: result._id,
        },
      });
  } catch (err) {
    console.error("Error saving patient:", err);
    res.status(500).json({ error: err.message });
  }
}
async function getuserbyId(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const patient = await Patient.findOne({ _id: id });
    console.log(patient);
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching users:", error); 
    res.status(500).json({ error: error.message });
  }
}
async function edituserbyid(req, res) {
  const id = req.params.id;
  console.log("user:", req.body);
  try {
    const updateFields = {
      name: req.body.name,
      email: req.body.email,
      mobileNumeber: req.body.mobileNumeber,
      dateOfBirth: req.body.dateOfBirth,
      matricalStatus: req.body.matricalStatus,
      nationality: req.body.nationality,
      doctor: req.body.doctor,
      address: req.body.address,
      identity: req.body.identity,
      age: req.body.age,
      bloodgroup: req.body.bloodgroup,
      birthdate: req.body.birthdate,
      menstrualstopdate: req.body.menstrualstopdate,
    };
    const updatedResult = await Patient.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
      res.status(200).json(updatedResult);
      console.log("result is", updatedResult);
  } catch (error) {
    console.error("Error updating users:", error); 
    res.status(500).json({ error: error.message });
  }
}
async function getpatientsappointsdoctor(req, res) {
  try {
    const Doctorid = req.params.Doctorid;
    console.log(Doctorid);
    const bookings = await Patient.find({ Doctorid: Doctorid });
    res.status(200).json(bookings);
  } catch (error) {
    if (error.response) {
      console.error("Invalid status code:", error.response.status);
    } else {
      console.error("Network or config error:", error.message);
    }
  }
}
async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email: `${email}` });

    if (!patient) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(patient);
    const token = await Patient.matchpassword(email, password);

    if (!token) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        patient: {
          id: patient._id,
          name: patient.name,
          email: patient.email,
        },
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}
async function forgetpassword(req, res) {
  console.log(req.body.email);
  try {
    const email = req.body.email;
    const existuser = await Patient.findOne({ email: email });
    console.log(existuser);
    if (!existuser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const token = createtoken(existuser);
    const url = `http://localhost:3000/patients/resetpassword/${existuser._id}/${token}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "smitakadam2609@gmail.com",
        pass: "adfv rypg vnwm heec",
      },
    });

    let mailOptions = {
      from: "smitakadam2609@gmail.com",
      to: `${existuser.email}`,
      subject: "Reset password",
      html: `<h1>MatricClinic Website Password Reset link : </h1><p>${url}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ message: "Reset send to email" });
      }
    });
  } catch (error) {
    console.error("User error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}
async function resetpassword(req, res) {
  const { id, token } = req.params;
  const {email,password} = req.body;
  console.log(id,token,email,password);
  try {
    const verify = validationtoken(token);
    if(!verify){
      console.log("Token Not Verifited")
    } 
    const result = await Patient.updatedpassword(email, password);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.send("Not verified");
  }
}
async function logout(req, res) {
  res.clearCookie("token");
  return res.json({ Status: true });
}
module.exports = {
  postuser,
  getusers,
  getuserbyId,
  edituserbyid,
  getpatientsappointsdoctor,
  signin,
  logout,
  forgetpassword,
  resetpassword,
};
