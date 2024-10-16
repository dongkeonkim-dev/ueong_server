// Server/controller/post-controller.js
const Posts = require('../models/posts');
const Photos = require('../models/photos');
const PostSearchHistory = require('../models/post-search-history');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { check } = require('../utils/check')
const logger = require('../utils/logger')

class PostsController {
    static async searchPosts(req, res) {
        const username = req.params.username;
        const { village, searchTerm, sortBy } = req.query;
        
        check(searchTerm.trim()).string.length.inRange.assert('검색어',0)

        const histories = await PostSearchHistory.getHistoryByUsername(username);
        const searchTermExists = histories.some(history => history.search_term === searchTerm);
        if (searchTermExists) {
            await PostSearchHistory.updateHistory(username, searchTerm);
        } else {
            await PostSearchHistory.addHistory(username, searchTerm);
        }
        const posts = await Posts.searchPosts(username, village, searchTerm, sortBy);
        check(posts).array.length.log('포스트')
        logger(`check(posts).array.length: ${check(posts).array.length}`)
        res.json(posts);
    }

    static async getFavoritePostsByUsername(req, res) {
        const username = req.params.username;
        const posts = await Posts.getFavoritePostsByUsername(username);
        check(posts).array.length.log('좋아요한 포스트')
        res.json(posts);
    }

    static async getMyPostsByUsername(req, res) {
        const username = req.params.username;
        const posts = await Posts.getMyPostsByUsername(username);
        check(posts).array.length.log('내 포스트')
        res.json(posts);
    }

    static async getPostById(req, res) {
        const postId = req.params.postId;
        const username = req.params.username;
        const post = await Posts.getPostById(username, postId);
        check(post).isValid.assert('postId')
        res.json(post);
    }

    // 게시물 생성 및 파일 업로드 처리 함수
    static async uploadPost(req, res, next) {
        if (req.is('multipart/form-data')) {
            await PostsController.uploadPostByMPForm(req, res, next);
        } else if (req.is('application/json')) {
            await PostsController.createPost(req, res);
        } else {
            throw new HttpError('Unsupported Content-Type', 400);
        }
    }

    static async uploadPostByMPForm(req, res, next) {
        //멀터 미들웨어 사용
        uploadFiles(req, res, async (err) => {
            if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리
            const postId = await PostsController.createPost(req, res);
            const postPhotoDatas = req.uploadedFiles.images.map((image) => ({
                photo_name: image,
                photo_directory: `/uploads/images/${image}`,
                post_id: postId
            }));
            await Photos.savePhotos(postPhotoDatas)
            res.status(201).json({
                message: 'Post uploaded successfully',
                postId,
                photos: postPhotoDatas
            });
        });
    }

    // 게시물 생성 로직 분리
    static async createPost(req, res) {
        const { title, categoryId, price, writerUsername, emdId, latitude, longitude, locationDetail, text } = req.body;
        const requiredFields = {title, categoryId, price, writerUsername, emdId, latitude, longitude, locationDetail, text}
        check(requiredFields).areValid.assert()
        const postId = await Posts.createPost({ ...requiredFields });
        return postId;
    }

    static async changePostStatus(req, res) {
        const { postId, status } = req.body;
        const requiredFields = { postId, status }
        check(requiredFields).areValid.assert()
        result = await Posts.changePostStatus({ ...requiredFields });
        res.json(result)
    }
}

module.exports = PostsController;
