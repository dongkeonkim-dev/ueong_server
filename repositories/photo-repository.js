// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { Photo } = require('../utils/db/models');
const { validCreate, validGet } = require('../utils/validation/custom-zod-types');

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

  // 여러 사진을 한 번에 저장하는 함수 (최대 10개)
  static async createPhotoRows(photoRows) {
    // Array().passthrough().min(1).max(10).parse(photoRows);
    if (photoRows.length === 0 || photoRows.length > 10) {
      throw new Error('You must provide between 1 and 10 photos.');
    }
    return validCreate(await db('photo').insert(photoRows));
  }
}
module.exports = Photos;
