const express = require('express');
const authController = require('../controllers/authController');
const { verifyAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes definitions
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', verifyAuth, authController.me);

module.exports = router;
