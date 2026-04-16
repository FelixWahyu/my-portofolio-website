const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const aboutController = require('../controllers/aboutController');
const { verifyAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/about-img');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'about-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, png, webp) are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
// Public route (if needed in future)
router.get('/', aboutController.getAbouts);

// Protected routes
router.use(verifyAuth); // Protect all write operations

router.get('/:id', aboutController.getAboutById);
router.post('/', upload.single('image'), aboutController.createAbout);
router.put('/:id', upload.single('image'), aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

module.exports = router;
