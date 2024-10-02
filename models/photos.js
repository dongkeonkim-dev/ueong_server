// Server/Models/Posts.js
const db = require('../utils/db');

class Photos {
    static async getPhotosByPostId(postId) {
        const query = `
            SELECT *
            FROM photo
            WHERE post_id = ?
        `;
        const [rows] = await db.query(query, [postId]);
        return rows;
    }

    static async getPhotoById(postId) {
        const query = `
            SELECT *
            FROM photo
            WHERE post_id = ?
        `;
        const [rows] = await db.query(query, [postId]);
        return rows;
    }
}
module.exports = Photos;
