// Server/Models/Posts.js
const db = require('../utils/db');

class Posts {
    static async searchPosts(username, searchTerm) {
        const query = `
            SELECT post.*, 
                CASE 
                    WHEN favorite.post_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS is_favorite
            FROM post
            LEFT JOIN favorite 
                ON favorite.post_id = post.post_id 
                AND favorite.user_id = 
                    (SELECT user_id 
                    FROM users
                    WHERE username = ?)
            WHERE post_title LIKE ? OR text LIKE ?
        `;
        const [rows] = await db.query(query, [username, `%${searchTerm}%`, `%${searchTerm}%`]);
        return rows;
    }

    static async getFavoritePostsByUsername(username){
        const query = `
        SELECT *, 1 AS is_favorite
        FROM favorite
        LEFT JOIN Post ON favorite.post_id = post.post_id
        WHERE favorite.user_id = 
            (SELECT user_id 
            FROM users
            WHERE username = ?)
        `;
        const [rows] = await db.query(query, [username]);
        return rows;
    }

    static async getMyPostsByUsername(username){
        const query = `
        SELECT *, post.post_id,
            CASE 
                WHEN favorite.post_id IS NOT NULL THEN TRUE 
                ELSE FALSE 
            END AS is_favorite
        FROM post
        LEFT JOIN favorite 
            ON favorite.post_id = post.post_id 
            AND favorite.user_id = (
                SELECT user_id 
                FROM users
                WHERE username = ?
            )
        WHERE post.writer_id = (
            SELECT user_id 
            FROM users
            WHERE username = ?
        );
        `;
        const [rows] = await db.query(query, [username, username]);
        return rows;
    }

    static async postPost(postData) {
        try {
            const { title, category, price, writerUsername, emdId, latitude, longitude, locationDetail, text } = postData;
            const query = `
                INSERT INTO post 
                SET post_title = ?, 
                    category_id = ?, 
                    status = ?, 
                    price = ?, 
                    writer_id = (SELECT user_id FROM users WHERE users.username = ?), 
                    emd_id = ?, 
                    desired_trading_location_latitude = ?, 
                    desired_trading_location_longitude = ?, 
                    desired_trading_location_detail = ?, 
                    text = ?, 
                    create_at = NOW(),
                    is_active = ?
            `;
            const values = [title, category, "거래대기", price, writerUsername, emdId, latitude, longitude, locationDetail, text, 1];
            const [result] = await db.execute(query, values);
            return result.insertId; // 생성된 게시물 ID 반환
        } catch (error) {
            console.error('Error creating post:', error);
            throw error; // 호출하는 곳에서 처리할 수 있도록 오류 다시 던지기
        }
    }
    
}

module.exports = Posts;


// SELECT post.*, 
// CASE 
//     WHEN favorite.post_id IS NOT NULL THEN TRUE 
//     ELSE FALSE 
// END AS is_favorite
// FROM post
// LEFT JOIN favorite 
// ON favorite.post_id = post.post_id 
// AND favorite.user_id = 
//     (SELECT user_id 
//     FROM users
//     WHERE username = ?)
// WHERE post_title LIKE ? OR text LIKE ?