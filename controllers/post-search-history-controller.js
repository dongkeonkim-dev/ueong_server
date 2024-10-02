// Server/controller/user-controller.js
const PostSearchHistory = require('../models/post-search-history');

class PostSearchHistoryController {
    static async getHistoryByUsername(req, res) {
        const username = req.params.username;
        try {
            const history = await PostSearchHistory.getHistoryByUsername(username);
            if (history) {
                console.log("History found: ", history); // 응답 로그 추가
                res.json(history);
            } else {
                console.log("History not found: ", username); // 응답 로그 추가
                res.json([]);
            }
        } catch (err) {
            console.error("Error fetching user: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteHistoryBySearchTerm(req, res) {
        const username = req.params.username;
        const searchTerm = req.params.searchTerm;
        
        try {
            const result = await PostSearchHistory.deleteHistory(username, searchTerm);
            if (result.affectedRows > 0) {
                console.log("History deleted: ", searchTerm);
                res.json({ message: 'History deleted successfully' });
            } else {
                console.log("History not found: ", username, searchTerm);
                res.status(404).json({ message: 'History not found' });
            }
        } catch (err) {
            console.error("Error deleting history: ", err);
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = PostSearchHistoryController;
