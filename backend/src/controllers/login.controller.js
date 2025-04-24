import { loginService } from '../services/login.service.js';

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

      return res.status(401).json({
        status: 'Success',
        message: 'Authentication completed',
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong',
        data: { error },
      });
    }
  },
};
