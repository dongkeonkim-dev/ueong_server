// Server/Models/Users.js
const db = require('../utils/db');

class Users {
    static async getUserByUsername(username) {
        const query = `
            SELECT * 
            FROM users 
            WHERE username = ?
        `;
        const [rows] = await db.query(query, [username]);
        return rows[0];
    }
}

module.exports = Users;
