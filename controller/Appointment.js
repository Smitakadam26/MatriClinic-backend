const Appointments = require("../model/Appointments");
async function getallappointment(req, res) {
  try {
    const appointments = await Appointments.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
async function getappointment(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const users = await Appointments.findOne({ _id: id });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
async function getappointmentslots(req, res) {
  try {
    const { date, Doctorid } = req.query;
    console.log(Doctorid, date);
    const bookings = await Appointments.find({
      date: date,
      Doctorid: Doctorid,
    });
    const bookedSlots = bookings.map((a) => a.time);
    const allSlots = [
      "10:00 AM",
      "11:00 AM",
      "12:00 AM",
      "13:00 PM",
      "14:00 PM",
      "18:00 PM",
      "19:00 PM",
      "20:00 PM",
      "21:00 PM",
      "22:00 PM",
    ];
    const availableSlots = allSlots.filter(
      (time) => !bookedSlots.includes(time),
    );
    console.log(availableSlots);
    res.status(200).json({ date, availableSlots });
  } catch (error) {
    if (error.response) {
      console.error("Invalid status code:", error.response.status);
    } else {
      console.error("Network or config error:", error.message);
    }
  }
}
async function getpatientappoint(req, res) {
  const { patientid } = req.query;
  console.log("patientapmnt", patientid);
  try {
    const appointments = await Appointments.find({
      Patient_Id: `${patientid}`,
    });
    console.log("appointments are : ", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
async function postappointment(req, res) {
  try {

    const getFileUrl = (file) => (file ? file[0].path : null);

    const appointmentData = {
      ...req.body,
      date: new Date(`${req.body.date}T00:00:00`),

      labTestFile: getFileUrl(req.files?.labTestFile),
      bloodTestFile: getFileUrl(req.files?.bloodTestFile),
      urineTestFile: getFileUrl(req.files?.urineTestFile),
      stressTestFile: getFileUrl(req.files?.stressTestFile),
      ultraSonicReport: getFileUrl(req.files?.ultraSonicReport),
    };

    const appointment = await Appointments.create(appointmentData);
    const savedAppointment = await appointment.save();
    res.status(200).json({
      message: "Appointment saved successfully",
      data: savedAppointment,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
}
async function gettodaysappointments(req, res) {
  try {
    const { date } = req.query;
    console.log(date);
    const bookings = await Appointments.find({ date });
    res.status(200).json(bookings);
  } catch (error) {
    if (error.response) {
      console.error("Invalid status code:", error.response.status);
    } else {
      console.error("Network or config error:", error.message);
    }
  }
}
async function getdoctorappointments(req, res) {
  try {
    const Doctorid = req.params.Doctorid;
    const datetime = new Date();
    const datestring = datetime.toISOString();
    const date = datestring.split("T")[0];
    console.log(date, Doctorid);
    const bookings = await Appointments.find({
      date: date,
      Doctorid: Doctorid,
    });
    res.status(200).json(bookings);
  } catch (error) {
    if (error.response) {
      console.error("Invalid status code:", error.response.status);
    } else {
      console.error("Network or config error:", error.message);
    }
  }
}
async function editvisitstatus(req, res) {
  const id = req.params.id;
  try {
    const updateFields = {
      isvisited: req.body.isvisited,
      date: req.body.date,
      time: req.body.time,
    };
    const updatedResult = await Appointments.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }, // return updated document
    );
    res.status(200).json(updatedResult);
  } catch (error) {
    console.error("Error updating users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
async function editappointment(req, res) {
  const id = req.params.id;
  try {
    const updateFields = {
      date: req.body.date,
      time: req.body.time,
    };
    const updatedResult = await Appointments.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }, 
    );
    console.log(updatedResult);
    res.status(200).json(updatedResult);
  } catch (error) {
    console.error("Error updating users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  getappointment,
  getappointmentslots,
  getpatientappoint,
  postappointment,
  gettodaysappointments,
  editvisitstatus,
  editappointment,
  getallappointment,
  getdoctorappointments,
};
