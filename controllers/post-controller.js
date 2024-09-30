// Server/controller/chat-controller.js
const Posts = require('../models/posts');

class PostsController {
    static async searchPosts(req, res) {
        const username = req.params.username;
        const searchTerm = req.query.searchTerm;

        try {
            const posts = await Posts.searchPosts(username, searchTerm);
            if (posts.length > 0) { // 수정: posts가 배열이므로 길이 확인
                console.log("Posts found: ", posts); // 응답 로그 추가
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
        const username = req.params.username;
        const postId = req.params.postId;
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

    static async postPost(req, res){

        try {
            const { title, category, price, writerUsername, emdId, latitude, longitude, locationDetail, text } = req.body;

            // 필수 데이터 검증
            if (!title || !category || !price || !emdId ||!latitude ||!longitude ||!locationDetail ||!text) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // 모델을 사용하여 새 게시물 생성
            const postId = await Posts.postPost({ title, category, price, writerUsername, emdId, latitude, longitude, locationDetail, text });

            // 성공 응답 반환
            res.status(201).json({ message: 'Post created successfully', postId });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = PostsController;
