// Server/controller/post-controller.js
const Posts = require('../models/posts');
const Photos = require('../models/photos');
const PostSearchHistory = require('../models/post-search-history');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { isValid, validate } = require('../utils/validation')

class PostsController {
    static async searchPosts(req, res) {
        const username = req.params.username;
        const { village, searchTerm, sortBy } = req.query;

        try {
            const posts = await Posts.searchPosts(username, village, searchTerm, sortBy);
            if (searchTerm.length > 0) {
                const histories = await PostSearchHistory.getHistoryByUsername(username);
                if (histories.some(history => history.search_term === searchTerm)) {
                    await PostSearchHistory.updateHistory(username, searchTerm);
                } else {
                    await PostSearchHistory.addHistory(username, searchTerm);
                }
            }
            if (posts.length > 0) {
                console.log(posts.length, "Posts found: "); // 응답 로그 추가
                res.json(posts);
            } else {
                console.log("Posts not found: ", searchTerm); // 응답 로그 추가
                res.status(404).json({ message: 'Posts not found' });
            }
        } catch (err) {
            console.error("Error searching post: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async getFavoritePostsByUsername(req, res) {
        const username = req.params.username;
        try {
            const posts = await Posts.getFavoritePostsByUsername(username);
            if (posts.length > 0) {
                console.log("Posts found: ", posts); // 응답 로그 추가
                res.json(posts);
            } else {
                console.log("Posts not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'Posts not found' });
            }
        } catch (err) {
            console.error("Error searching post: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async getMyPostsByUsername(req, res) {
        const username = req.params.username;
        try {
            const posts = await Posts.getMyPostsByUsername(username);
            if (posts.length > 0) {
                console.log("Posts found: ", posts); // 응답 로그 추가
                res.json(posts);
            } else {
                console.log("Posts not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'Posts not found' });
            }
        } catch (err) {
            console.error("Error searching post: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async getPostById(req, res) {
        const postId = req.params.postId;
        const username = req.params.username;
        try {
            const post = await Posts.getPostById(username, postId);
            if (post) {
                console.log("Post found: ", post); // 응답 로그 추가
                res.json(post);
            } else {
                console.log("Post not found: username:", username, " postId: ", postId); // 응답 로그 추가
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (err) {
            console.error("Error searching post: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    // 게시물 생성 및 파일 업로드 처리 함수
    static async uploadPost(req, res, next) {
        try {
            if (req.is('multipart/form-data')) {
                await PostsController.uploadPostByMPForm(req, res, next);
            } else if (req.is('application/json')) {
                await PostsController.createPost(req, res);
            } else {
                throw new HttpError('Unsupported Content-Type', 400);
            }
        } catch (error) { next(error); }
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
        // 모든 필수 필드 유효성 검사
        Object.entries(requiredFields).forEach(([key, value]) => {
            validate(isValid(value), `${key} is required`, 400);
        });
        // 게시물 생성
        const postId = await Posts.createPost({ title, categoryId, price, writerUsername, emdId, latitude, longitude, locationDetail, text });
        return postId;
    }
}

module.exports = PostsController;
