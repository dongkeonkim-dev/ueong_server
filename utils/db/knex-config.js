// knexfile.js
const config = require('../../config');
module.exports = {
  client: config.db.client,
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    connectTimeout: config.db.connectTimeout,
  },
  pool: {
    min: config.db.poolMin,
    max: config.db.poolMax,
  },
  migrations: {
    tableName: config.db.migrationsTable,
  },
};
