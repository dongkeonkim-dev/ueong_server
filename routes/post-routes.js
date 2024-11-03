// Server/routes/post-routes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/search', authenticate, PostController.searchPosts); // 검색
router.get('/favorite', authenticate, PostController.getFavoritePostsByUsername); // 즐겨찾기
router.get('/myPosts', authenticate, PostController.getMyPostsByUsername); // 내 게시물
router.get('/post_id/:post_id', authenticate, PostController.getPostById); // 게시물 상세
router.post('/', authenticate, PostController.createPost); // 게시물 생성
router.patch('/', authenticate, PostController.updatePost); // 게시물 수정
router.patch('/change-status', authenticate, PostController.changePostStatus) // 거래대기 | 거래완료
router.patch('/change-active', authenticate, PostController.changePostActive) // 게시물 활성화 (삭제)

module.exports = router;
