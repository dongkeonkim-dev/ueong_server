// Server/Models/Users.js
const db = require('../utils/db/knex');
const { validGet, validUpdate } = require('../utils/validation/custom-zod-types')
const { User } = require('../utils/db/models');

class Users {
  static async getUserByUsername(username) {
    const query = db(User.table).select(User.all).where(User.username, username);
    return validGet(await query).at(0);
  }

  static async updateUser(input) {
    const { username, ...updateFields } = input;
    const query = db(User.table).update(updateFields).where(User.username, username);
    return validUpdate(await query);
  }
}

module.exports = Users;
