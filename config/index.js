//config/index.js
const dotenv = require('dotenv');
const config = {
  accessTokenHeader: process.env.ACCESS_TOKEN_HEADER,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10),
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
};

module.exports = config;
