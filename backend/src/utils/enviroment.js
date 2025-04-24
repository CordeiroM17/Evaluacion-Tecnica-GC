import dotenv from 'dotenv';
dotenv.config();

// EMAIL and PASSWORD just for test
export const { PORT = 3000, EMAIL, PASSWORD, JWT_SECRET_KEY } = process.env;

export const validCategories = ['sports', 'movies', 'technology', 'music', 'games'];
