// Server/controller/post-controller.js
const PostRepository = require('../repositories/post-repository');
const PhotoRepository = require('../repositories/photo-repository');
const PostSearchHistoryRepository = require('../repositories/post-search-history-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { Enum } = require('../utils/validation/custom-zod-types');
const { Post, User, Search } = require('../utils/validation/schemas');
const { IMAGE_PATH } = require('../config/constants');

class PostsController {
  static async searchPosts(req, res) {
    const params = User.pick({ username: true }).parse(req.params);
    /**
     * @typedef {Object} input
     * @property {string} search_term
     * @property {number} emd_id
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

  // 게시물 생성 및 파일 업로드 처리 함수
  static async createPost(req, res, next) {
    if (req.is('multipart/form-data')) {
      await PostsController.createPostWithFiles(req, res, next);
    } else if (req.is('application/json')) {
      await PostsController.createPostWithoutFiles(req, res);
    } else {
      throw new HttpError('Unsupported Content-Type', 400);
    }
  }

  static async createPostWithFiles(req, res, next) {
    // 멀터 미들웨어 사용
    uploadFiles(req, res, async (err) => {
      if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리
      const input = Post.omit({ post_id: true }).parse(req.body);
      const createId = await PostRepository.createPost(input);
      const photoRows = req.uploadedFiles.image_names.map((photo_name) => ({
        photo_name: photo_name,
        photo_directory: `${IMAGE_PATH}${photo_name}`,
        post_id: createId
      }));
      await PhotoRepository.createPhotoRows(photoRows);
      res.status(201).json({ createId });
    });
  }

  // 게시물 생성 로직 분리
  static async createPostWithoutFiles(req, res) {
    const input = Post.omit({ post_id: true }).parse(req.body);
    const createId = await PostRepository.createPost(input);
    res.json({ createId });
  }

  static async updatePost(req, res) {
    const input = partialExcept(Post,{ post_id: true }).parse(req.body);
    const affectedRows = await PostRepository.updatePost(input);
    res.json({ affectedRows })
  }

  static async changePostStatus(req, res) {
    const input = Post.pick({ post_id: true, status: true }).parse(req.body);
    const affectedRows = await PostRepository.updatePost(input);
    res.json({ affectedRows })
  }

  static async chagePostActive(req, res) {
    const input = Post.pick({ post_id: true , is_active: true }).parse(req.body);
    const affectedRows = await PostRepository.updatePost(input);
    res.json({ affectedRows })
  }
}

module.exports = PostsController;
