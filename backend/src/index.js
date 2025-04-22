import express from 'express';
import cors from 'cors';
import { PORT } from './utils/enviroment.js';
import { initializeDatabase } from './utils/db.js';
import { subscriptionsRouter } from './routes/subscriptions.route.js';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

initializeDatabase();

// ENDPOINTS
app.use('/subscriptions', subscriptionsRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
