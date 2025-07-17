require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // stop the app if DB fails
});
