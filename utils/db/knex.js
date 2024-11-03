const Knex = require('knex');
const knexConfig = require('./knex-config');

const knex = Knex(knexConfig);
module.exports = knex;
