import { db } from '../utils/db.js';

export const subscriptionService = {
  createSubscription: function (phone, categories) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO subscriptions (phone, category) VALUES (?, ?)');

      db.serialize(() => {
        try {
          // Looping every category to insert them
          categories.forEach((category) => {
            stmt.run(phone, category, (err) => {
              if (err) {
                reject(err); // If one category fails, reject the promise
              }
            });
          });

          stmt.finalize((err) => {
            if (err) {
              reject(err);
            } else {
              resolve({ phone, categories }); // It's OK, return the new subscription
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    });
  },
};
