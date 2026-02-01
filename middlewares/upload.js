
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "appointments",
    allowed_formats: ["jpg", "png", "pdf","webp"],
    resource_type: "auto",
  },
});

const upload = multer({ storage });

module.exports = upload;
