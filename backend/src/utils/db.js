import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(':memory:');

export function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      UNIQUE(phone, category)
    )
    `);
  });
  console.log('Database running');
}
