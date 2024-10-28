// Server/models/auth.js
const db = require('../utils/db/knex');
const { User } = require('../utils/db/models');
const { validGet, validCreate } = require('../utils/validation/custom-zod-types');

class Auth {
  static async getAuthByUsername(username) {
    const query =
      db(User.table)
      .select(User.username, User.password, User.authority)
      .where(User.username, username);
    return validGet(await query).at(0);
  }

  static async signup(input) {
    const query = db(User.table).insert(input);
    return validCreate(await query).at(0);
  }
}

module.exports = Auth;
