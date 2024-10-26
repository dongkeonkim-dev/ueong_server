// Server/Models/Favorite.js
const db = require('../utils/db/knex');
const { Favorite } = require('../utils/db/models');
const { validDelete } = require('../utils/validation/custom-zod-types');
const { usernameToId } = require('../utils/helper');

class FavoriteRepository {
  static async insertFavorite(input) {
    input = usernameToId(input);
    await db(Favorite.table).insert(input);
    //pk X -> 삽입 반환값 X
  }

  static async deleteFavorite(input) {
    input = usernameToId(input);
    const query = db(Favorite.table).where(input).delete();
    return validDelete(await query);
  }
}

module.exports = FavoriteRepository;
