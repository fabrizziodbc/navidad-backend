import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { fetchByEmail } from '../../../controllers/user.controller.js';
import HttpError from '../../../models/http.error.model.js';

const LocalStrategy = new Strategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await fetchByEmail(email);
      if (!user) {
        done(new HttpError('Unauthorized access', 403), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(new HttpError('Unauthorized access', 403), false);
      }
      const data = JSON.parse(JSON.stringify(user));
      delete data.password;
      done(null, data);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  },
);

export default LocalStrategy;
