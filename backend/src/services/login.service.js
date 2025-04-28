import { db } from '../utils/db.js';

export const loginService = {
  login: function (email, password) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id, email, password, phone FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) {
          console.error();
          return reject('Database error:', err);
        }

        if (!row) {
          return reject('User not found');
        }

        // Todo Add dehash in password
        if (row.password === password) {
          resolve({
            id: row.id,
            email: row.email,
            password: row.password,
            phone: row.phone,
          });
        } else {
          reject('Password incorrect');
        }
      });
    });
  },
};
