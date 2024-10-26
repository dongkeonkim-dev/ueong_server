// Server/controller/chat-controller.js
const AddressRepository = require('../repositories/address-repository');
const { AddressEmd, Search } = require('../utils/validation/schemas')
const { SearchTerm } = require('../utils/validation/custom-zod-types')
const { log } = require('../utils/log')

class AddressController {
  static async getFullAddressById(req, res) {
    const input = AddressEmd.pick({ emd_id: true }).parse(req.params)
    const fullAddress = await AddressRepository.getFullAddressById(input.emd_id);
    res.json(fullAddress)
  }

  static async searchAddress(req, res){
    const input = Search.extend({ searchTerm : SearchTerm }).parse(req.query);
    const addressList = await AddressRepository.searchAddress(input.searchTerm);
    res.json(addressList);
  }

  static async getEmd(req, res){
    const params = AddressEmd.pick({ emd_id: true }).parse(req.params);
    const emd = await AddressRepository.getEmd(params.emd_id);
    res.json(emd);
  }
}

module.exports = AddressController;
