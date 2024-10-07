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

    static async savePhoto(photoData) {
        try {
            const query = `
                INSERT INTO photo (photo_name, photo_directory, post_id)
                VALUES (?, ?, ?)
            `;
            const values = [photoData.photo_name, photoData.photo_directory, photoData.post_id];
            const [result] = await db.execute(query, values);
            return { photo_id: result.insertId, ...photoData };
        } catch (error) {
            console.error('Error saving photo:', error);
            throw error;
        }
    }
}
module.exports = Photos;
