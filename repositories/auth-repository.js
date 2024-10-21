// Server/models/auth.js
const db = require('../utils/knex');

class Auth {
    static async getUserAuthByUsername(username) {
        const query = `
            SELECT username, password, user_id, authority
            FROM users 
            WHERE username = ?
        `;
        const [rows] = await db.raw(query, [username]);
        return rows[0];
    }
}

module.exports = Auth;
