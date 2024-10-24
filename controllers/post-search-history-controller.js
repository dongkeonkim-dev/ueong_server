// Server/controller/user-controller.js
const PostSearchHistoryRepository = require('../repositories/post-search-history-repository');
const { User, Search } = require('../utils/validation/schemas')

class PostSearchHistoryController {
    static async getHistoryByUsername(req, res) {
        const input = User.pick({ username: true }).parse(req.params)
        const history = await PostSearchHistoryRepository.getHistoryByUsername(input.username);
        res.json(history);
    }

    static async deleteHistoryBySearchTerm(req, res) {
        const input = Search.pick({ search_term: true }).merge(User.pick({ username: true })).parse(req.query)
        const affectedRows = await PostSearchHistoryRepository.deleteHistory(input.username, input.search_term);
        res.json({ affectedRows });
    }
}

module.exports = PostSearchHistoryController;
