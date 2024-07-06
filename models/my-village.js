// Server/models/my-village.js
const db = require('../utils/db');

class MyVillage {
    static async getMyVillageByUserId(userId) {
        const query = `
            SELECT user_id, v.emd_id as emd_id, emd_name
            FROM my_village as v
            LEFT JOIN address_emd as ad_e 
            ON v.emd_id = ad_e.emd_id
            WHERE user_id = ?
        `;
        const [rows] = await db.query(query, [userId]);
        return rows;
    }
}

module.exports = MyVillage;
