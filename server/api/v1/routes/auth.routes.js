import express from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import { signToken } from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/')
  .post(
    body('email', 'Email is required!').notEmpty(),
    body('email', 'Format invalid').isEmail(),
    body('password', 'Password is required!').notEmpty(),
    body('password', 'You must use at least five (05) characters').isLength({
      min: 5,
    }),
    signToken,
    passport.authenticate('local', { session: false }),
  );

export default router;
