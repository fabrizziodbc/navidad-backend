import bcrypt from 'bcrypt';

const hashPassword = async () => {
  const myHash = '$2b$10$d2hLMpn3uvu1CGEV1XVOkuVgxxuRM7gb9bkd3/rmVo9D8f9gh5kDu';
  const myPassword = 'Apolo2020';
  const isMatch = await bcrypt.compare(myPassword, myHash);
  console.log(isMatch);
};
hashPassword();
