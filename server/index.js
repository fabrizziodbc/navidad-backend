/* eslint-disable import/extensions */
import express from 'express';
import { Result } from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import api from './api/v1/index.js';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);
app.use('/api/1', api);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  const statusCode = 400;
  const message = 'Error. Route not found';
  next({ statusCode, message });
});
app.use((err, req, res, next) => {
  if (err instanceof Result) {
    return res.status(400).json({ errors: err.array() });
  }
  const { statusCode = 500, message = 'Unknown error' } = err;
  return res.status(statusCode).json({ message });
});

export default app;
