import jwt from 'jsonwebtoken';

const Mytoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJkZWZhdWx0IiwiaWF0IjoxNjQxNzUxMTczfQ.1usax4FTbgVABYMpRN359TkPe-NhQd-EwaITFb_iXv0';
const mySecret = 'myCat';

const verifyToken = (token, secret) => jwt.verify(token, secret);

const myPayload = verifyToken(Mytoken, mySecret);
console.log(myPayload);
