import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(':memory:');

export function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE subscriptions (
        phone TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);
  });
  console.log('Database running');
}
