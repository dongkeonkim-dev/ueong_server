// Server/controller/post-controller.js
const Posts = require('../models/posts');
const Photos = require('../models/photos');
const PostSearchHistory = require('../models/post-search-history');
const { uploadImage } = require('../middlewares/multer-middleware');

class PostsController {
    static async searchPosts(req, res) {
        const username = req.params.username;
        const {village, searchTerm, sortBy} = req.query;

        try {
            const posts = await Posts.searchPosts(username, village, searchTerm, sortBy);
            if (searchTerm.length > 0){
                const histories = await PostSearchHistory.getHistoryByUsername(username);
                if (histories.some(history => history.search_term === searchTerm)) {
                    await PostSearchHistory.updateHistory(username, searchTerm);
                } else {
                    await PostSearchHistory.addHistory(username, searchTerm);
                }                
            }
            if (posts.length > 0) { // 수정: posts가 배열이므로 길이 확인
                console.log(posts.length,"Posts found: ")//, posts); // 응답 로그 추가
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
            if (posts.length > 0) { // 수정: posts가 배열이므로 길이 확인
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
            if (posts.length > 0) { // 수정: posts가 배열이므로 길이 확인
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
            if (post) { // 수정: posts가 배열이므로 길이 확인
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
    static async uploadPost(req, res) {

        var postId

        try {
            // 게시물 생성
            postId = await PostsController.createPost(req.body);
            if (!postId) {
                return res.status(400).json({ error: 'Failed to create post' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
        if (!req.files || req.files.length === 0) {
            res.status(201).json({ message: `Post created successfully and no files, ${(postId)}`});
           return     
        }

        PostsController.uploadFiles(req, res, postId);
        res.status(201).json({ message: `Post and files created successfully, ${(postId)}`});

        return
    }

    // 게시물 생성 로직 분리
    static async createPost(postData) {
        const { title, categoryId, price, writerUsername, emdId, latitude, longitude, locationDetail, text } = postData;

        // 필수 데이터 검증
        if (
            title == null || 
            categoryId == null || 
            price == null || 
            writerUsername == null || 
            emdId == null || 
            latitude == null || 
            longitude == null || 
            locationDetail == null || 
            text == null
        ) {
            throw new Error('Missing required fields');
        }

        // 게시물 생성
        const postId = await Posts.createPost({ title, categoryId, price, writerUsername, emdId, latitude, longitude, locationDetail, text });
        return postId;
    }

    // 파일 업로드 로직 분리
    static uploadFiles(req, res, postId) {
        const upload = uploadImage.array('photos', 10); // 최대 10개의 파일 업로드

        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading files:', err);
                return res.status(400).json({ error: 'Error uploading files' });
            }

            try {
                const photoRecords = await PostsController.savePhotoRecords(req.files, postId);
                res.status(201).json({ message: 'Post created successfully', postId, photos: photoRecords });
            } catch (error) {
                console.error('Error saving photo records:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }

    // 파일 정보를 DB에 저장하는 로직 분리
    static async savePhotoRecords(files, postId) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }

        const photoRecords = [];
        for (const file of files) {
            const photoName = file.filename;
            const photoDirectory = `/uploads/images/${file.filename}`;
            const photoRecord = {
                photo_name: photoName,
                photo_directory: photoDirectory,
                post_id: postId
            };

            // photos 테이블에 각 파일 정보 저장
            const savedPhoto = await Photos.savePhoto(photoRecord);
            photoRecords.push(savedPhoto);
        }

        return photoRecords;
    }
}

module.exports = PostsController;
