// knexfile.js
module.exports = {
  development: {
    client: 'mysql2', // Use MySQL2 client
    connection: {
      host: 'localhost',
      user: 'root',
      password: '11223344',
      database: 'ueong',
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '11223344',
      database: 'ueong',
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
