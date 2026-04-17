const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/aboutRoutes');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate Limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'], // Frontend origin
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth/login', loginLimiter); // Apply limiter specifically to login
app.use('/api/auth', authRoutes);
app.use('/api/abouts', aboutRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong on the server';

  res.status(status).json({
    message,
    errors: err.errors || undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
