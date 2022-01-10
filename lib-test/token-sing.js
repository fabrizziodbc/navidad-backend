import jwt from 'jsonwebtoken';

const mySecret = 'myCat';
const jwtConfig = {
  expiresIn: 10,
};
const myPayload = {
  sub: 1,
  role: 'default',
};

const singToken = (payload, secret) => jwt.sign(payload, secret);

const token = singToken(myPayload, mySecret, jwtConfig);
console.log(token);
