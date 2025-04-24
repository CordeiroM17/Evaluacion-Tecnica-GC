import { EMAIL, PASSWORD } from '../utils/enviroment.js';

export const loginService = {
  login: function (email, password) {
    console.log(email, password);
    return new Promise((resolve, reject) => {
      // Dehash password
      if (email === EMAIL && password === PASSWORD) {
        resolve({ email, password });
      } else {
        reject({});
      }
    });
  },
};
