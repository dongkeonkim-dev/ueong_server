// Server/Models/Address.js
const db = require('../utils/db/knex');
const { MyVillage, Emd, User } = require('../utils/db/models')
const { usernameToId } = require('../utils/helper')
const { validGet } = require('../utils/validation/custom-zod-types')
const { log } = require('../utils/log')

class MyVillageRepository {
  static async getMyVillageByUsername(username) {
    const query = db(MyVillage.table)
      .select(Emd.all)
      .leftJoin(Emd.table, MyVillage.emd_id, Emd.emd_id)
      .where(MyVillage.user_id, User.user_id(username))
    return validGet(await query);
  }

  static async addMyVillage(input) {
    input = usernameToId(input);
    await db(MyVillage.table).insert(input);
    //pk X -> 반환값 X
  }
}

module.exports = MyVillageRepository;
