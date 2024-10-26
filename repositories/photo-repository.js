// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { Photo } = require('../utils/db/models');
const { validCreate, validGet, validUpdate } = require('../utils/validation/custom-zod-types');
const { log } = require('../utils/log');

class Photos {
  static async getPhotosByPostId(postId) {
    const query = db(Photo.table).select(Photo.all).where(Photo.post_id, postId);
    return validGet(await query);
  }

  static async getPhotosByPostIds(postIds) {
    const query = db(Photo.table).select(Photo.all).whereIn(Photo.post_id, postIds);
    return validGet(await query);
  }

  static async getPhotoById(photoId) {
    const query = db(Photo.table).select(Photo.all).where(Photo.photo_id, photoId);
    return validGet(await query).at(0);
  }

  static async getPhotosByIds(photoIds) {
    const query = db(Photo.table).select(Photo.all).whereIn(Photo.photo_id, photoIds);
    return validGet(await query);
  }

  static async createPhotoRows(photoRows) {
    const insertedIds = await db.transaction(async (trx) => {
      const query = trx('photo').insert(photoRows);
      const lastInsertId = validCreate(await query).at(0);
      var insertedIds = [];
      for (let i = 0; i < photoRows.length; i++) {
        insertedIds.push(lastInsertId - photoRows.length + 1 + i);
      }
      return insertedIds;
    }, { isolationLevel: 'serializable' });
    return insertedIds;
  }

  static async linkPhotos(input) {
    const { post_id, photo_ids } = input;
    const query = db('photo')
      .whereIn(Photo.photo_id, photo_ids)
      .update({ post_id });
    return validUpdate(await query);
  }
}
module.exports = Photos;
