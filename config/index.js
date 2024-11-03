//config/index.js
const dotenv = require('dotenv');
const config = {
  nodeEnv: process.env.NODE_ENV,
  accessTokenHeader: process.env.ACCESS_TOKEN_HEADER,
  port: parseInt(process.env.PORT, 10),
  secretKey: process.env.SECRET_KEY,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, process.env.BCRYPT_SALT_BASE),
  db: {
    client: process.env.DB_CLIENT,
    host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
    user: process.env.NODE_ENV === 'production' ? process.env.DB_USER_PROD : process.env.DB_USER_DEV,
    password: process.env.NODE_ENV === 'production' ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD_DEV,
    database: process.env.NODE_ENV === 'production' ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV,
    port: parseInt(process.env.DB_PORT, 10),
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT, 10),
    migrationsTable: process.env.DB_MIGRATIONS_TABLE,
    poolMin: parseInt(process.env.DB_POOL_MIN, 10),
    poolMax: parseInt(process.env.DB_POOL_MAX, 10),
  },
};

module.exports = config;
