// Server/Models/Address.js
const db = require('../utils/db/knex');
const { Emd, Sgg, Sd, Address } = require('../utils/db/models');
const { validGet } = require('../utils/validation/custom-zod-types');
const { log } = require('../utils/log');

class AddressRepository {
  static async getFullAddressById(emd_id) {
    const query = db(Emd.table)
      .select(Emd.emd_id)
      .select(Address.fullAddressAs)
      .leftJoin(Sgg.table, Emd.sgg_id, Sgg.sgg_id)
      .leftJoin(Sd.table, Sgg.sd_id, Sd.sd_id)
      .where(Emd.emd_id, emd_id);
    return validGet(await query).at(0);
  }

  static async searchAddress(searchTerm) {
    const query = db(Emd.table)
      .select(Emd.emd_id)
      .select(Address.fullAddressAs)
      .leftJoin(Sgg.table, Emd.sgg_id, Sgg.sgg_id)
      .leftJoin(Sd.table, Sgg.sd_id, Sd.sd_id)
      .where(Address.fullAddress, `LIKE`, `%${searchTerm}%`);
    return validGet(await query);
  }

  static async getEmd(emd_id) {
    const query = db(Emd.table)
      .select(Emd.all)
      .where(Emd.emd_id, emd_id);
    return validGet(await query).at(0);
  }
}

module.exports = AddressRepository;
