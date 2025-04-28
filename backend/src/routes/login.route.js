import express from 'express';
import { loginController } from '../controllers/login.controller.js';
import { validateLogin, validateToken } from '../middlewares/login.middleware.js';

export const loginRouter = express.Router();

loginRouter.post('/', validateLogin, loginController.postLogin);

// Clear cookie TEST
loginRouter.post('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ status: 'Success', message: 'Cookie deleted', data: {} });
});

// Verify token, frontend needs where ask if the token is functional
loginRouter.get('/verifyToken', validateToken, (req, res) => {
  res.status(200).json({ status: 'Success', message: 'Authenticated', data: {} });
});
