// Server/controller/user-controller.js
const FavoriteRepository = require('../repositories/favorite-repository');
const { Favorite, omitUserId } = require('../utils/validation/schemas');

class FavoriteController {
  static async addFavorite(req, res) {
    const input = omitUserId(Favorite).parse(req.body);
    input.username = req.user.username;
    await FavoriteRepository.insertFavorite(input);
    res.status(201).json({ message: `addFavorite successfully`});
  }

  static async deleteFavorite(req, res) {
    const input = omitUserId(Favorite).parse(req.query);
    input.username = req.user.username;
    const affectedRows = await FavoriteRepository.deleteFavorite(input);
    res.status(201).json({ affectedRows });
  }
}

module.exports = FavoriteController;
