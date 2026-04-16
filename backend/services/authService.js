const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AuthService {
  async register(name, email, password) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      const error = new Error('User already exists');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Store session
    await prisma.session.create({
      data: { userId: user.id, token },
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  async logout(token) {
    return await prisma.session.deleteMany({
      where: { token },
    });
  }

  async findSession(token, userId) {
    return await prisma.session.findFirst({
      where: { 
        token: token,
        userId: userId
      },
    });
  }
}

module.exports = new AuthService();
