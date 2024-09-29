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
}

module.exports = PostsController;
