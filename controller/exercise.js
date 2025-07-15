const Exercise = require("../model/exercise");

async function getexercises(req, res) {
  try {
    const users = await Exercise.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
    getexercises
};