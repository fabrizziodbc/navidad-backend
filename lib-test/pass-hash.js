import bcrypt from 'bcrypt';

const hashPassword = async () => {
  const myPassword = 'Apolo2020';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
};
hashPassword();
