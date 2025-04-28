import { db } from '../utils/db.js';

export const subscriptionService = {
  createSubscription: async function (phone, categories) {
    const { categoriesAvailables: validCategories } = await this.categories();

    const areAllCategoriesValid = categories.every((cat) => validCategories.includes(cat));

    if (!areAllCategoriesValid) {
      throw 'Invalid categories';
    }

    return new Promise((resolve, reject) => {
      // Search user with the same phone number
      db.get('SELECT id FROM users WHERE phone = ?', [phone], (err, row) => {
        if (err) {
          return reject(err);
        }
        if (!row) {
          return reject('User not found');
        }

        const userId = row.id;
        const stmt = db.prepare('INSERT OR IGNORE INTO subscriptions (user_id, category_id) VALUES (?, ?)');

        db.serialize(() => {
          try {
            const insertPromises = categories.map((category) => {
              return new Promise((resolveCat, rejectCat) => {
                db.get('SELECT id FROM categories WHERE name = ?', [category], (err, categoryRow) => {
                  if (err) {
                    return rejectCat(err);
                  }

                  if (categoryRow) {
                    stmt.run(userId, categoryRow.id, (err) => {
                      if (err) {
                        return rejectCat(err);
                      }
                      resolveCat();
                    });
                  } else {
                    rejectCat(`Category ${category} not found`);
                  }
                });
              });
            });

            Promise.all(insertPromises)
              .then(() => {
                stmt.finalize((err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve({ phone, categories });
                  }
                });
              })
              .catch((err) => {
                reject(err);
              });
          } catch (err) {
            reject(err);
          }
        });
      });
    });
  },

  getSubscriptionsByPhone: function (phone) {
    return new Promise((resolve, reject) => {
      // JOIN between users, subscriptions y categories table
      const query = `
        SELECT categories.name as category
        FROM users
        JOIN subscriptions ON users.id = subscriptions.user_id
        JOIN categories ON categories.id = subscriptions.category_id
        WHERE users.phone = ?
      `;

      db.all(query, [phone], (err, rows) => {
        if (err) {
          return reject(err);
        }
        if (rows.length === 0) {
          return resolve({ phone, categories: [] });
        }

        const categories = rows.map((row) => row.category);
        resolve({ phone, categories });
      });
    });
  },

  categories: async function () {
    return new Promise((resolve, reject) => {
      db.all('SELECT name FROM categories', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const dbCategories = rows.map((row) => row.name);
          resolve({ categoriesAvailables: dbCategories });
        }
      });
    });
  },
};
