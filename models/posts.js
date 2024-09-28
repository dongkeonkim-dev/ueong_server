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