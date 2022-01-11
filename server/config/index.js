const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  smtp: {
    username: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
};

export default config;
