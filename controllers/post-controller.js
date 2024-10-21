// Server/controller/post-controller.js
const PostRepository = require('../repositories/post-repository');
const PhotoRepository = require('../repositories/photo-repository');
const PostSearchHistoryRepository = require('../repositories/post-search-history-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { checkIf } = require('../utils/delete/checkIf')
const { Object, Natural, String, Enum, Double, Binary } = require('../utils/custom-zod-types')

const Post = Object({
    post_id: Natural,
    post_title: String.max(255),
    category_id: Natural,
    status: Enum(['거래대기', '거래완료']).optional(), // default '거래대기'
    price: Natural,
    writer_username: String,
    emd_id: Natural,
    desired_trading_location_latitude: Double,
    desired_trading_location_longitude: Double,
    desired_trading_location_detail: String,
    text: String.max(1023),
    is_active: Binary.optional(), //default 1
})

const Search = Object ({
    search_term: String.default(''),
    sortBy: Enum(['price', 'favorite_count', 'create_at']).default('create_at'),
})

const User = Object({
    username: String.max(32),
})

class PostsController {
    static async searchPosts(req, res) {
        const params = User.pick({ username: true }).parse(req.params)
        const input = Search.merge(Post.pick({ emd_id: true })).parse(req.query)
        const histories = await PostSearchHistoryRepository.getHistoryByUsername(params.username);
        const searchTermExists = histories.some(history => history.search_term === input.search_term);
        if (searchTermExists) {
            await PostSearchHistoryRepository.updateHistory(params.username, input.search_term);
        } else {
            await PostSearchHistoryRepository.addHistory(params.username, input.search_term);
        }
        const posts = await PostRepository.searchPosts(params.username, input);
        res.json(posts);
    }

    static async getFavoritePostsByUsername(req, res) {
        const params = User.pick({ username: true }).parse(req.params)
        const posts = await PostRepository.getFavoritePostsByUsername(params.username);
        res.json(posts);
    }

    static async getMyPostsByUsername(req, res) {
        const params = User.pick({ username: true }).parse(req.params)
        const posts = await PostRepository.getMyPostsByUsername(params.username);
        res.json(posts);
    }

    static async getPostById(req, res) {
        const params = Post.pick({ post_id: true }).merge(User.pick({ username: true })).parse(req.params)
        const post = await PostRepository.getPostById(params.username, params.post_id);
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
            await PhotoRepository.savePhotos(postPhotoDatas)
            res.status(201).json(postId);
        });
    }

    // 게시물 생성 로직 분리
    static async createPost(req, res) {
        const input = Post.omit({ post_id: true }).parse(req.body)
        const postId = await PostRepository.createPost(input);
        return postId;
    }

    static async changePostStatus(req, res) {
        const { postId, status } = req.body;
        const requiredFields = { postId, status }
        checkIf(requiredFields).areNotNil.elseThrow()
        result = await PostRepository.changePostStatus({ ...requiredFields });
        res.json(result)
    }
}

module.exports = PostsController;
