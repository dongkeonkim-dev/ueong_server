// Server/Models/Posts.js
const db = require('../utils/knex');

class PostSearchHistory {
    static async getHistoryByUsername(username) {
        const query = `
            SELECT *
            FROM post_search_history
            WHERE user_id = (
                SELECT user_id
                FROM users
                WHERE username = ?
            )
            ORDER BY search_time DESC
        `;
        const [rows] = await db.raw(query, [username]);
        return rows;
    }

    static async addHistory(username, searchTerm) {
        const query = `
            INSERT INTO post_search_history
            SET user_id = (
                SELECT user_id
                FROM users
                WHERE username = ?
            ), 
                search_term = ?, 
                search_time = NOW()
        `;
        const [rows] = await db.raw(query, [username, searchTerm]);
        return rows;
    }

    static async updateHistory(username, searchTerm) {
        const query = `
            UPDATE post_search_history
            SET search_time = NOW()
            WHERE user_id = (
                SELECT user_id
                FROM users
                WHERE username = ?
            ) AND search_term = ?
        `;
        const [rows] = await db.raw(query, [username, searchTerm]);
        return rows;
    }

    static async deleteHistory(username, searchTerm) {
        const query = `
            DELETE FROM post_search_history
            WHERE user_id = (
                SELECT user_id
                FROM users
                WHERE username = ?
            ) AND search_term = ?
        `;
        const [rows] = await db.raw(query, [username, searchTerm]);
        return rows;
    }
}
module.exports = PostSearchHistory;
