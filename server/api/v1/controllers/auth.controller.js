import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { updateByMail, fetchByEmail } from './user.controller.js';
import HttpError from '../models/http.error.model.js';
import config from '../../../config/index.js';

const { jwtSecret, smtp } = config;

const sendRecovery = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await fetchByEmail(email);
    if (!user) {
      next(new HttpError('You are not authorized', 500));
    }
    const myPayload = {
      // eslint-disable-next-line no-underscore-dangle
      sub: user._id,
    };
    const recoveryToken = jwt.sign(myPayload, jwtSecret, {
      expiresIn: 600,
    });
    await updateByMail({ email, recoveryToken });
    const link = `http://myfrontend.com/recovery?token=${recoveryToken}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: smtp.username,
        pass: smtp.password,
      },
    });
    await transporter.sendMail({
      from: '"Fred Foo 👻" <fabrizziodbc@gmail.com>',
      to: 'ps.fabc.011772@gmail.com', // change to => email
      subject: 'Hello ✔',
      html: `<b>Ingresa a este link => ${link}</b>`,
    });
    console.log(`mail sent to: ${email}`);
    return res.json({ message: 'Mail sent' });
  } catch (error) {
    /* console.log(error); */
    return next(new HttpError('There was an error sending the mail', 403));
  }
};

const signToken = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
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
    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};
const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  try {
    const { token, newPassword } = req.body;
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.sub)
      .select('-__v')
      .populate('list', 'listName');
    if (user.recoveryToken !== token) {
      next(new HttpError('You are not authorized', 403));
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await updateByMail({ email: user.email, recoveryToken: null, password: hash });
    res.json({ message: 'Password changed' });
  } catch (error) {
    next(new HttpError('You are not authorized', 403));
  }
};
export { sendRecovery, signToken, changePassword };
