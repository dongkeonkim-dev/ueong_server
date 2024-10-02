// Server/models/my-village.js
const db = require('../utils/db');

class MyVillage {
    static async getMyVillageByUsername(username) {
        const query = `
            SELECT v.emd_id as emd_id, emd_name
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
}

module.exports = MyVillage;
