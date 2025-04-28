import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT } from './utils/enviroment.js';
import { initializeDatabase } from './utils/db.js';

import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './utils/swagger.js';

import { subscriptionsRouter } from './routes/subscriptions.route.js';
import { loginRouter } from './routes/login.route.js';

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

initializeDatabase();

// ENDPOINTS
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerOptions));
app.use('/subscriptions', subscriptionsRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; // Export app for TEST
