import { loginService } from '../services/login.service.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/enviroment.js';

export const loginController = {
  postLogin: async function (req, res) {
    const { email, password } = req.loginBody;

    try {
      const userFound = await loginService.login(email, password);

      if (!userFound) {
        return res.status(401).json({
          status: 'Error',
          message: 'Unauthorized',
          data: {},
        });
      }

      // Create token if user authenticated
      const token = jwt.sign(userFound, JWT_SECRET_KEY);

      return res
        .cookie('token', token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .json({
          status: 'Success',
          message: 'Authentication completed',
          data: userFound,
        });
    } catch (error) {
      if (error === 'Password incorrect' || error === 'User not found') {
        return res.status(400).json({
          status: 'Error',
          message: error,
          data: {},
        });
      }
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },
};
