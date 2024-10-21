// Server/Models/Favorite.js
const db = require('../utils/knex');

class Favorite {
    static async insertFavorite(postId, username) {
        const query = `
            INSERT INTO favorite (post_id, user_id)
            VALUES (?, (
                SELECT user_id 
                FROM users
                WHERE username = ?
            ))
        `; 
        const [result] = await db.raw(query, [postId, username]);
        return result;
    }

    // 좋아요 제거 메서드
    static async deleteFavorite(postId, username) {
        const query = `
            DELETE FROM favorite
            WHERE post_id = ? AND user_id = (
                SELECT user_id 
                FROM users
                WHERE username = ?
            )
        `; 
        const [result] = await db.raw(query, [postId, username]);
        return result;
    }
}

module.exports = Favorite;
