// Server/controller/user-controller.js
const Favorite = require('../models/favorite');

class FavoriteController {
    static async addFavorite(req, res) {
        const { postId, username } = req.body;

        try {
            await Favorite.insertFavorite(postId, username);
            res.status(201).json({ message: `insertFavorite successfully`});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteFavorite(req, res) {
        const { postId, username } = req.query;
        try {
            await Favorite.deleteFavorite(postId, username);
            res.status(201).json({ message: `deleteFavorite successfully`});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = FavoriteController;
