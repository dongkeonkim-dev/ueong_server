// Server/controller/user-controller.js
const FavoriteRepository = require('../repositories/favorite-repository');
const { Favorite, needUsername } = require('../utils/validation/schemas');

class FavoriteController {
  static async addFavorite(req, res) {
    const input = needUsername(Favorite).parse(req.body);
    await FavoriteRepository.insertFavorite(input);
    res.status(201).json({ message: `addFavorite successfully`});
  }

  static async deleteFavorite(req, res) {
    const input = needUsername(Favorite).parse(req.query);
    const affectedRows = await FavoriteRepository.deleteFavorite(input);
    res.status(201).json({ affectedRows });
  }
}

module.exports = FavoriteController;
