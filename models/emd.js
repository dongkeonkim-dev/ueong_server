// Server/models/my-village.js
const db = require('../utils/db');

class Emd {
    static async getMyVillageByUsername(username) {
        const query = `
            SELECT ad_e.*
            FROM my_village as v
            LEFT JOIN address_emd as ad_e 
            ON v.emd_id = ad_e.emd_id
            WHERE user_id = (
                SELECT user_id 
                FROM users
                WHERE username = ?
            )
        `;
        const [rows] = await db.query(query, [username]);
        return rows;
    }

    static async getEmd(emdId) {
        const query = `
            SELECT *
            FROM address_emd
            WHERE emd_id = ?
        `;

        const [rows] = await db.query(query, [emdId]);
        return rows[0];
    }
}

module.exports = Emd;
