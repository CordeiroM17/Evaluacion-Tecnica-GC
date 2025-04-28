import sqlite3 from 'sqlite3';
import { EMAIL, PASSWORD, PHONENUMBER, validCategories } from './enviroment.js';

export const db = new sqlite3.Database(':memory:');

export function initializeDatabase() {
  db.serialize(() => {
    console.log('-----CREATING DATABASE IN MEMORY-----');
    // Create user table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL
      )
    `);

    console.log('User table CREATED');

    // Create categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      )
    `);

    console.log('Categories table CREATED');

    // Create subsctiption table for validCategories
    db.run(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        UNIQUE(user_id, category_id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);

    console.log('Subsctiption table CREATED');

    // Insert validCategories in categories table
    const insertCategory = db.prepare(`
      INSERT INTO categories (name) VALUES (?)
    `);

    validCategories.forEach((category) => {
      insertCategory.run(category);
    });

    insertCategory.finalize();
    console.log('Valid categories are inserted ');

    // Insert user with email, password and phone number
    db.run(
      `
      INSERT INTO users (email, password, phone)
      VALUES (?, ?, ?)
    `,
      // Todo Add hash in password
      [EMAIL, PASSWORD, PHONENUMBER],
      function (error) {
        if (error) {
          return console.error('Error inserting user:', error.message);
        }

        console.log('Inserted test user with ID:', this.lastID);
      }
    );
  });

  console.log('Database running');
}
