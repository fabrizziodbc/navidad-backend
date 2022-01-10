import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';

const { jwtSecret } = config;

const router = express.Router();

router
  .route('/')
  .post(
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        const { user } = req;
        const myPayload = {
          // eslint-disable-next-line no-underscore-dangle
          sub: user._id,
          role: 'default',
        };
        const token = jwt.sign(myPayload, jwtSecret, {
          expiresIn: '2d', // 180, (para que el refresh sea cada 3 minutos)
        });
        res.json({ user, token });
      } catch (error) {
        next(error);
      }
    },
  );

export default router;
