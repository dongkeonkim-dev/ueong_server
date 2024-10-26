// Server/controller/post-controller.js
const PostRepository = require('../repositories/post-repository');
const PhotoRepository = require('../repositories/photo-repository');
const PostSearchHistoryRepository = require('../repositories/post-search-history-repository');
const { Enum, Array, Natural } = require('../utils/validation/custom-zod-types');
const { Post, User, Search } = require('../utils/validation/schemas');

class PostsController {
  static async searchPosts(req, res) {
    const params = User.pick({ username: true }).parse(req.params);
    /**
     * @typedef {Object} input
     * @property {string} //search_term
    * @property {number} /emd_id
     * @property {'price' | 'favorite_count' | 'create_at'} sort_by
     */
    const input = Search.merge(Post.pick({ emd_id: true }))
      .extend({ sort_by: Enum(['price', 'favorite_count', 'create_at']).default('create_at') }).parse(req.query);
    // 검색어가 있으면 검색어 기록 추가
    if (input.search_term.length > 0) {
      const histories = await PostSearchHistoryRepository.getHistoryByUsername(params.username);
      const searchTermExists = histories.some(history => history.search_term === input.search_term);
      // 검색어가 있으면 기록 업데이트, 없으면 기록 추가
      if (searchTermExists) {
        await PostSearchHistoryRepository.updateHistory(params.username, input.search_term);
      } else {
        await PostSearchHistoryRepository.addHistory(params.username, input.search_term);
      }
    }
    // 검색 결과 조회
    const posts = await PostRepository.searchPosts(params.username, input);
    res.json(posts);
  }

  static async getFavoritePostsByUsername(req, res) {
    const params = User.pick({ username: true }).parse(req.params);
    const posts = await PostRepository.getFavoritePostsByUsername(params.username);
    res.json(posts);
  }

  static async getMyPostsByUsername(req, res) {
    const params = User.pick({ username: true }).parse(req.params);
    const posts = await PostRepository.getMyPostsByUsername(params.username);
    res.json(posts);
  }

  static async getPostById(req, res) {
    const params = Post.pick({ post_id: true }).merge(User.pick({ username: true })).parse(req.params);
    const post = await PostRepository.getPostById(params.username, params.post_id);
    res.json(post);
  }

  static async createPost(req, res) {
    const input = Post
      .omit({ post_id: true })
      .extend({ photo_ids: Array(Natural) })
      .parse(req.body);
    const { photo_ids, ...post } = input;
    const post_id = await PostRepository.createPost(post);
    const affectedRows = await PhotoRepository
      .linkPhotos({ post_id, photo_ids });
    res.json({ createId: post_id });
  }

  static async updatePost(req, res) {
    const postSchema = Post.extend({ photo_ids: Array(Natural) });
    const input = partialExcept(postSchema, { post_id: true }).parse(req.body);
    const { photo_ids, ...post } = input;
    const affectedRows = await PostRepository.updatePost(post);
    if (photo_ids) {
      const affectedPhotoRows = await PhotoRepository
        .linkPhotos({ post_id: input.post_id, photo_ids });
    }
    res.json({ affectedRows })
  }

  static async changePostStatus(req, res) {
    const input = Post.pick({ post_id: true, status: true }).parse(req.body);
    const affectedRows = await PostRepository.updatePost(input);
    res.json({ affectedRows })
  }

  static async changePostActive(req, res) {
    const input = Post.pick({ post_id: true , is_active: true }).parse(req.body);
    const affectedRows = await PostRepository.updatePost(input);
    res.json({ affectedRows })
  }
}

module.exports = PostsController;
