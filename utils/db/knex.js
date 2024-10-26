// knex.js
const Knex = require('knex');
const knexConfig = require('./knex-config');
// const parseWhere = require('./parseWhere');

// Knex.QueryBuilder.extend('complexWhere', function (whereObject) {
//   const { sql, values } = parseWhere(whereObject);
//   return this.whereRaw(sql, values);
// })

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

module.exports = knex;
