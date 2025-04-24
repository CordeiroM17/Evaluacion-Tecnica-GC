import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/enviroment.js';

export function validateLogin(req, res, next) {
  let { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    // Verify if in the req.body exist email and password
    if (!email || !password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email and password required',
        data: {},
      });
    }

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid email',
        data: {},
      });
    }

    // Validate password
    // 8 characters
    // 1 uppercase character
    // 1 number
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        status: 'Error',
        message: 'password must have at least 8 characters',
        data: {},
      });
    }

    // DTO
    req.loginBody = {
      email,
      password,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
      data: { error },
    });
  }
}

export function validateToken(req, res, next) {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthorized',
        data: {},
      });
    }

    // If jwt.verify fails, throw error
    jwt.verify(token, JWT_SECRET_KEY);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthorized token expired',
        data: {},
      });
    }

    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
      data: { error },
    });
  }
}
