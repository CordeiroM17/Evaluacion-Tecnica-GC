import { db } from '../utils/db.js';

export const loginService = {
  login: function (email, password) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT email, password, phone FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return reject({});
        }

        if (!row) {
          console.log('User not found');
          return reject({});
        }

        // Todo Add dehash in password
        if (row.password === password) {
          resolve({
            email: row.email,
            password: row.password,
            phone: row.phone,
          });
        } else {
          console.log('Password incorrect');
          reject({});
        }
      });
    });
  },
};
