import express from 'express';
import { body } from 'express-validator';
import { changePassword, sendRecovery } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/').post(
  sendRecovery,
);
router.route('/change-password').post(
  body('token', 'Password is required!').notEmpty(),
  body('password', 'Password is required!').notEmpty(),
  body('password', 'You must use at least five (05) characters').isLength({
    min: 5,
  }),
  changePassword,
);

export default router;
