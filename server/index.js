import express from 'express';

import api from './api/v1/index.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);
app.use('/api/1', api);

app.use((req, res, next) => {
  const statusCode = 400;
  const message = 'Error. Route not found';
  next({ statusCode, message });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Unknown error' } = err;
  res.status(statusCode).json({ message });
});

export default app;
