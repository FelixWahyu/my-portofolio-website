const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyAuth } = require('../middleware/authMiddleware');


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/about-img/'; // Reusing the same directory for now
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `project-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
  },
});

// Routes
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', verifyAuth, upload.single('image'), projectController.createProject);
router.put('/:id', verifyAuth, upload.single('image'), projectController.updateProject);
router.delete('/:id', verifyAuth, projectController.deleteProject);

module.exports = router;
