// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { User } = require('../utils/db/models');
const { validGet, validCreate, validUpdate, validDelete } = require('../utils/validation/custom-zod-types');
const { PostSearchHistory } = require('../utils/db/models');
const { log } = require('../utils/log');
class PostSearchHistoryRepository {
  static async getHistoryByUsername(username) {
    const query = db(PostSearchHistory.table)
      .select(PostSearchHistory.all)
      .where(PostSearchHistory.user_id, User.user_id(username))
      .orderBy(PostSearchHistory.search_time, 'desc');
    return validGet(await query);
  }

  static async addHistory(username, searchTerm) {
    const query = db(PostSearchHistory.table).insert({
      user_id: User.user_id(username),
      search_term: searchTerm,
      search_time: db.raw('NOW()')
    });
    return validCreate(await query).at(0);
  }

  static async updateHistory(username, searchTerm) {
    const query = db(PostSearchHistory.table)
      .where(PostSearchHistory.user_id, User.user_id(username))
      .andWhere(PostSearchHistory.search_term, searchTerm)
      .update({ search_time: db.raw('NOW()') });
    return validUpdate(await query);
  }

  static async deleteHistory(username, searchTerm) {
    const query = db(PostSearchHistory.table)
      .where(PostSearchHistory.user_id, User.user_id(username))
      .andWhere(PostSearchHistory.search_term, searchTerm)
      .delete();
    log(query.toSQL());
    return validDelete(await query);
  }
}
module.exports = PostSearchHistoryRepository;
