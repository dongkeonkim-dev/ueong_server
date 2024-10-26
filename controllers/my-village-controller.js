// Server/controller/my-village-controller.js
const MyVillageRepository = require('../repositories/my-village-repository');
const { MyVillage, User,needUsername } = require('../utils/validation/schemas')
const { log } = require('../utils/log')
class MyVillageController {
  static async getMyVillageByUsername(req, res) {
    const input = User.pick({ username: true }).parse(req.params);
    const rows = await MyVillageRepository.getMyVillageByUsername(input.username);
    res.json(rows);
  }

  static async addMyVillage(req, res) {
    const input = needUsername(MyVillage).parse(req.body);
    await MyVillageRepository.addMyVillage(input);
    res.status(201).json({ message: `addMyVillage successfully`});
  }
}

module.exports = MyVillageController;
