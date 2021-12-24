import express from 'express';
import users from './routes/user.routes.js';
import lists from './routes/list.routes.js';

const router = express.Router();
router.use('/users', users);
router.use('/lists', lists);

export default router;
