require('dotenv').config();
const express = require("express");
const app = express();
const cookieparser = require('cookie-parser')
const {checkforauthenticationcookie} = require('./middlewares/checkforauthenticationcookie')
require('./config/db');
const cors = require('cors');
app.use(express.json());
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"))
const userroute = require('./routes/userroute')
const doctorroute = require('./routes/doctors')
const Appointmentroute = require('./routes/Appointments')
const adminroute = require('./routes/admin')

// Instead of just localhost, allow your deployed frontend too:
const allowedOrigins = [
  "http://localhost:3000",
  "https://matri-clinic-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // if using cookies or auth headers
}));
app.use('/admin',adminroute)
app.use('/patients',userroute)
app.use('/doctors',doctorroute)
app.use('/Appointments',Appointmentroute)
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});
