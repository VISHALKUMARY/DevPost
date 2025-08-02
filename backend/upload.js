const multer = require('multer');
const { storage } = require('./cloudinary'); // Adjust path if needed

const upload = multer({ storage });

module.exports = upload;
