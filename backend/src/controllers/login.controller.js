import { loginService } from '../services/login.service.js';

export const loginController = {
  postLogin: async function (req, res) {
    const { email, password } = req.body;
    // const { email, password } = req.loginBody;

    try {
      const userFound = await loginService.login(email, password);

      if (!userFound) {
        return res.status(401).json({
          status: 'Error',
          msg: 'Unauthorized',
          data: {},
        });
      }

      return res.status(401).json({
        status: 'Success',
        msg: 'Authentication completed',
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: { error },
      });
    }
  },
};
