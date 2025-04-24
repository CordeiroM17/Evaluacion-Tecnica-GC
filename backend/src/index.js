import express from 'express';
import cors from 'cors';

import { PORT } from './utils/enviroment.js';
import { initializeDatabase } from './utils/db.js';

import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './utils/swagger.js';

import { subscriptionsRouter } from './routes/subscriptions.route.js';
import { loginRouter } from './routes/login.route.js';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

initializeDatabase();

// ENDPOINTS
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerOptions));
app.use('/subscriptions', subscriptionsRouter);
app.use('/login', loginRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
