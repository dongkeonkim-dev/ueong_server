// Server/Models/Address.js
const db = require('../utils/knex');

class Address {
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
        const [rows] = await db.raw(query, [username]);
        return rows;
    }

    static async addMyVillage(username, emdId) {
        const query = `
            INSERT INTO my_village (user_id, emd_id)
            VALUES (
                (SELECT user_id FROM users WHERE username = ?),
                ?
            )
        `;

        try {
            const [result] = await db.raw(query, [username, emdId]);
            return result;
        } catch (err) {
            console.error("Error adding village: ", err);
            throw new Error('Failed to add village.');
        }
    }
}

module.exports = Address;
