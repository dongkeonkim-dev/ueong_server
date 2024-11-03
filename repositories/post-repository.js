// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { validCreate, validUpdate, validGet, validGetExist } = require('../utils/validation/custom-zod-types');
const { Post, Writer, Favorite, FavoriteCount, User, ArModel } = require('../utils/db/models');
const { log } = require('../utils/log');

class PostRepository {
  // 게시물 기본 형식
  static postQuery(username) {
    return db(Post.table)
      .select(Post.all)
      .select(Writer.writer_usernameAs)
      .select(Favorite.is_favoriteAs)
      .select(FavoriteCount.favorite_countAs)
      .select(ArModel.ar_model_id)
      .leftJoin(ArModel.table, Post.post_id, ArModel.post_id)
      .leftJoin(Writer.table, Post.writer_id, Writer.user_id)
      .leftJoin(Favorite.table, function(){
        this.on(Post.post_id, Favorite.post_id)
          .andOn(Favorite.user_id, User.user_id(username))
      })
      .leftJoin(FavoriteCount.table, Post.post_id, FavoriteCount.post_id);
  }

  static async searchPosts(input) {
    const query =
      this.postQuery(input.username)
      // 검색 조건
      .where(function () {
        this.where(Post.post_title, 'like', `%${input.search_term}%`)
          .orWhere(Post.text, 'like', `%${input.search_term}%`);
      })
      .andWhere(Post.emd_id, input.emd_id)
      .andWhere(Post.is_active, 1)
      .andWhere(Post.status, '거래대기')
      // AR 모델 필터링
      log(`input.ar_only: ${input.ar_only}`)

    if (input.ar_only === true) {
      query.whereNotNull(ArModel.ar_model_id);
    }

    // 정렬
    query.orderBy(
      input.sort_by,
      input.sort_by === 'price' ? 'asc' : 'desc'
    );
    log(query.toSQL())
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

  static async getPostById(input) {
    const query =
      this.postQuery(input.username)
      .where(Post.post_id, input.post_id)
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
