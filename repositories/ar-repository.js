// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { ArModel } = require('../utils/db/models');
const { validCreate, validGet, validUpdate } = require('../utils/validation/custom-zod-types');
const { log } = require('../utils/log');

class ArRepository {
  static async getArModelByPostId(postId) {
    const query = db(ArModel.table).select(ArModel.all).where(ArModel.post_id, postId);
    return validGet(await query);
  }

  static async getArModelsByPostIds(postIds) {
    const query = db(ArModel.table).select(ArModel.all).whereIn(ArModel.post_id, postIds);
    return validGet(await query);
  }

  static async getArModelById(arModelId) {
    const query = db(ArModel.table).select(ArModel.all).where(ArModel.ar_model_id, arModelId);
    return validGet(await query).at(0);
  }

  static async getArModelsByIds(arModelIds) {
    const query = db(ArModel.table).select(ArModel.all).whereIn(ArModel.ar_model_id, arModelIds);
    return validGet(await query);
  }

  static async createArModelRows(arModelRows) {
    const insertedIds = await db.transaction(async (trx) => {
      const query = trx('ar_model').insert(arModelRows);
      const lastInsertId = validCreate(await query).at(0);
      var insertedIds = [];
      for (let i = 0; i < arModelRows.length; i++) {
        insertedIds.push(lastInsertId + i);
      }
      return insertedIds;
    }, { isolationLevel: 'serializable' });
    return insertedIds;
  }

  static async linkArModel(input) {
    const { post_id, ar_model_id } = input;
    const query = db('ar_model')
      .where(ArModel.ar_model_id, ar_model_id)
      .update({ post_id });
    //복합 업데이트, validUpdate 사용 불가
    return await query;
  }

  static async unlinkAllArModels(post_id) {
    const query = db(ArModel.table).where(ArModel.post_id, post_id).update({ post_id: null });
    //복합 업데이트, validUpdate 사용 불가
    return await query;
  }
}
module.exports = ArRepository;
