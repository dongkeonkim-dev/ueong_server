// Server/controller/my-village-controller.js
const MyVillageRepository = require('../repositories/my-village-repository');
const { MyVillage, omitUserId } = require('../utils/validation/schemas')
const { log } = require('../utils/log')
class MyVillageController {
  static async getMyVillageByUsername(req, res) {
    const rows = await MyVillageRepository.getMyVillageByUsername(req.user.username);
    res.json(rows);
  }

  static async addMyVillage(req, res) {
    const input = omitUserId(MyVillage).parse(req.body);
    input.username = req.user.username;
    await MyVillageRepository.addMyVillage(input);
    res.status(201).json({ message: `addMyVillage successfully`});
  }
}

module.exports = MyVillageController;
