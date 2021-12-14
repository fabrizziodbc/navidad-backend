import express from 'express';
import users from './routes/user.routes.js';

const router = express.Router();
router.use('/users', users);

export default router;
