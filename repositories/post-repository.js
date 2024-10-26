// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { validCreate, validUpdate, validGet, validGetExist } = require('../utils/validation/custom-zod-types');
const { Post, Writer, Favorite, FavoriteCount, User } = require('../utils/db/models');
const { log } = require('../utils/log');

class PostRepository {
  // 게시물 기본 형식
  static postQuery(username) {
    return db(Post.table)
      .select(Post.all)
      .select(Writer.writer_username)
      .select(Favorite.is_favorite)
      .select(FavoriteCount.favorite_count)
      .leftJoin(Writer.table, Post.writer_id, Writer.user_id)
      .leftJoin(Favorite.table, function(){
        this.on(Post.post_id, Favorite.post_id)
          .andOn(Favorite.user_id, User.user_id(username))
      })
      .leftJoin(FavoriteCount.table, Post.post_id, FavoriteCount.post_id);
  }

  static async searchPosts(username, input) {
    const query =
      this.postQuery(username)
      // 검색 조건
      .where(function () {
        this.where(Post.post_title, 'like', `%${input.search_term}%`)
          .orWhere(Post.text, 'like', `%${input.search_term}%`);
      })
      .andWhere(Post.emd_id, input.emd_id)
      .andWhere(Post.is_active, 1)
      .andWhere(Post.status, '거래대기')
      // 정렬
      .orderBy(
        input.sort_by,
        input.sort_by === 'price' ? 'asc' : 'desc'
      );
    return validGet(await query);
  }

  static async getFavoritePostsByUsername(username) {
    const query =
      this.postQuery(username)
      .where(Favorite.user_id, User.user_id(username))
      .andWhere(Post.is_active, 1)
      .andWhere(Post.status, '거래대기')
      .orderBy(Post.create_at, 'desc');


    return validGet(await query);
  }

  static async getMyPostsByUsername(username) {
    const query =
      this.postQuery(username)
      .where(Writer.username, username)
      .andWhere(Post.is_active, 1)
      //거래대기, 거래완료 전부 조회
      .orderBy(Post.create_at, 'desc');

    return validGet(await query);
  }

  static async getPostById(username, post_id) {
    const query =
      this.postQuery(username)
      .where(Post.post_id, post_id)
      .andWhere(Post.is_active, 1)
      //거래대기, 거래완료 전부 조회
    return validGetExist(await query).at(0);
  }

  static async createPost(input) {
    input.writer_id = User.user_id(input.writer_username);
    delete input.writer_username;
    const query = db(Post.table).insert(input);
    return validCreate(await query).at(0);
  }

  static async updatePost(input) {
    if (input.writer_username) {
      input.writer_id = User.user_id(input.writer_username);
      delete input.writer_username;
    }
    const { post_id, ...updateFields } = input;
    const query = db(Post.table).where(Post.post_id, post_id).update(updateFields);
    //복합 업데이트, validUpdate 사용 불가
    return await query;
  }

}

module.exports = PostRepository;
