// Server/controller/user-controller.js
const PostSearchHistoryRepository = require('../repositories/post-search-history-repository');
const { User, Search } = require('../utils/validation/schemas')

class PostSearchHistoryController {
    static async getHistoryByUsername(req, res) {
      const input = {};
      input.username = req.user.username;
      const history = await PostSearchHistoryRepository.getHistoryByUsername(input.username);
      res.json(history);
    }

    static async deleteHistoryBySearchTerm(req, res) {
        const input = Search.pick({ search_term: true }).parse(req.query)
        input.username = req.user.username;
        const affectedRows = await PostSearchHistoryRepository.deleteHistory(input.username, input.search_term);
        res.json({ affectedRows });
    }
}

module.exports = PostSearchHistoryController;
