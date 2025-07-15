const Admin = require("../model/admin");

async function getadmin(req, res) {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
}
async function getadminbyId(req, res) {
  const id = req.params.id;
  try {
    const admin = await Admin.findOne({ _id: `${id}` });
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
async function postadmin(req, res) {
  try {
    console.log("Request body:", req.body);
    const newUser = new Admin(req.body);
    const result = await newUser.save();
    console.log("Patient Register:", result); // Log the saved product for debugging
    res.status(200).json(result);
  } catch (err) {
    console.error("Error saving product:", err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const admin = await Admin.findOne({ email: `${email}` });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const token = await Admin.matchpassword(email, password);

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
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}
async function logout(req, res) {
  res.clearCookie("token");
  return res.json({ Status: true });
}
module.exports = {
  getadmin,
  getadminbyId,
  signin,
  logout,
  postadmin
};
