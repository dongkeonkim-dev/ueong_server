// Server/Models/Address.js
const db = require('../utils/knex');

class Address {
    static async getFullAddressById(emdId) {
        const query = `
            SELECT emd.emd_id AS id,
                CONCAT (sd.sd_name, " ", sgg.sgg_name, " ", emd.emd_name) AS Address
            FROM address_emd AS emd
            LEFT JOIN address_sgg AS sgg
                ON emd.sgg_id = sgg.sgg_id
            LEFT JOIN address_sd AS sd 
                ON sd.sd_id = sgg.sd_id
            WHERE emd.emd_id = ?
        `; 
        const [rows] = await db.raw(query, [emdId]);
        return rows[0];
    }

    static async searchAddress(searchTerm) {
        const query = `
        SELECT emd_id AS id,
            CONCAT (sd.sd_name, " ", sgg.sgg_name, " ", emd.emd_name) AS Address
        FROM address_emd AS emd
        LEFT JOIN address_sgg AS sgg
            ON emd.sgg_id = sgg.sgg_id
        LEFT JOIN address_sd AS sd 
            ON sd.sd_id = sgg.sd_id
        WHERE CONCAT(sd.sd_name, " ", sgg.sgg_name, " ", emd.emd_name) LIKE ?
        `
        console.log(query);
        console.log(searchTerm);
        const [rows] = await db.raw(query, [`%${searchTerm}%`]);
        return rows;
    }

    static async getEmd(emdId) {
        const query = `
            SELECT *
            FROM address_emd
            WHERE emd_id = ?
        `;

        const [rows] = await db.raw(query, [emdId]);
        return rows[0];
    }
}

module.exports = Address;
