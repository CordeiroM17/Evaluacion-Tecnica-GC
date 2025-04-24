import swaggerJSDoc from 'swagger-jsdoc';
import { __dirname } from '../dirname.js';

const options = {
  definition: {
    openapi: '3.1.1',
    info: {
      title: 'Documentation Technical Evaluation GC',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const swaggerOptions = swaggerJSDoc(options);
