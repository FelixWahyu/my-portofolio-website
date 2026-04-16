const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists in DB
    const session = await authService.findSession(token, decoded.userId);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized: Session expired or invalid' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyAuth };
