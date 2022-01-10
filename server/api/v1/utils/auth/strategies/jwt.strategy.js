import { Strategy, ExtractJwt } from 'passport-jwt';
/* import bcrypt from 'bcrypt';
import { fetchByEmail } from '../../../controllers/user.controller.js';
import HttpError from '../../../models/http.error.model.js'; */
import config from '../../../../../config/index.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, (payload, done) => done(null, payload));

export default JwtStrategy;
