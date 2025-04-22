import express from 'express';
import { PORT } from './utils/enviroment.js';

const app = express();

// ENDOPOINTS
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Success', message: 'Endpoint working' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
