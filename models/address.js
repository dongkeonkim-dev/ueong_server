// Server/Models/Address.js
const db = require('../utils/db');

class Address {
    static async getFullAddressById(emdId) {
        const query = `
            SELECT 
                CONCAT (sd.sd_name, " ", sgg.sgg_name, " ", emd.emd_name) AS Address
            FROM address_emd AS emd
            LEFT JOIN address_sgg AS sgg
                ON emd.sgg_id = sgg.sgg_id
            LEFT JOIN address_sd AS sd 
                ON sd.sd_id = sgg.sd_id
            WHERE emd.emd_id = ?
        `; 
        const [rows] = await db.query(query, [emdId]);
        return rows[0];
    }
}

module.exports = Address;
