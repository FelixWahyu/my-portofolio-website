const authService = require('../services/authService');
const { z } = require('zod');

const RegisterSchema = z.object({
  name: z.string().max(100),
  email: z.string().email().max(100),
  password: z.string().min(6).max(100),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = RegisterSchema.parse(req.body);
      const user = await authService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.status = 400;
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = LoginSchema.parse(req.body);
      const { token, user } = await authService.login(email, password);

      // Set HttpOnly Cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({ message: 'Login successful', user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.status = 400;
      }
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.cookies.token;
      if (token) {
        await authService.logout(token);
      }
      res.clearCookie('token');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      // req.userId is set by authMiddleware
      res.json({ userId: req.userId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
