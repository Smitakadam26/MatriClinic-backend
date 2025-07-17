
# 🤰 MatriClinic Backend

MatriClinic is a secure backend API for a maternity management system focused on pregnant women. It supports role-based access for admins and patients, and is designed for maternity hospitals to efficiently handle patient data, appointments, and maternal care records.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Vercel (Deployment)

---

## 🧑‍⚕️ Admin Features

- Login/logout
- Manage:
  - Patients and their pregnancy records
  - Doctors
  - Appointments (today's, by doctor, upcoming)
  - Visit reports and pregnancy condition updates
- Add visit summaries and schedule appointments
- Secure endpoints via admin role

---

## 👩 Patient Features

- Login/logout
- Access to:
  - Personal data and pregnancy history
  - Medical reports and visit records
- Protected access via patient role

---

## 🔐 Authentication & Authorization

- JWT tokens for secure sessions
- Middleware to verify user roles (`admin`, `patient`)
- CORS configured to allow frontend origin

---

