const Doctor = require('../model/doctors')

async function getdoctors(req,res){
    try {
        const users = await Doctor.find();
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
}
async function postdoctor(req, res) {
  try {
    console.log("Request body:", req.body);
    const newUser = new Doctor(req.body);

    const result = await newUser.save();
    console.log("Doctor Register:", result); // Log the saved product for debugging
    res.status(200).json(result);
  } catch (err) {
    console.error("Error saving product:", err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
}
async function getdoctorbyId(req, res) {
  const id = req.params.id;
  try {
    const admin = await Doctor.findOne({ _id: `${id}` });
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  postdoctor,
  getdoctors,
  getdoctorbyId
};
