import express from 'express';
import passport from 'passport';
import lists from './routes/list.routes.js';
import login from './routes/auth.routes.js';
import users from './routes/user.routes.js';
import myList from './routes/myList.routes.js';

const router = express.Router();
router.use('/users', users);
router.use('/lists', passport.authenticate('jwt', { session: false }), lists);
router.use('/login', login);
router.use('/my-list', passport.authenticate('jwt', { session: false }), myList);

export default router;
