// Server/Models/Posts.js
const db = require('../utils/knex');
const DBHelper = require('../utils/delete/DBHelper')

class PostRepository {
    static async searchPosts(username, input) {
        const { emd_id, search_term, sort_by } = input
        console.log(input)
        let query = `
        SELECT post.*, 
        writer.username AS writer_username, 
        CASE 
            WHEN favorite_count_table.favorite_count IS NULL THEN 0 
            ELSE favorite_count_table.favorite_count 
        END AS favorite_count,
        CASE 
            WHEN favorite.post_id IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS is_favorite
        FROM post
        LEFT JOIN users AS writer
            ON post.writer_id = writer.user_id
        LEFT JOIN favorite 
            ON favorite.post_id = post.post_id 
            AND favorite.user_id = (
                SELECT user_id 
                FROM users
                WHERE username = ?
            )
         LEFT JOIN (
            SELECT post_id, COUNT(*) AS favorite_count
            FROM favorite
            GROUP BY post_id
       ) AS favorite_count_table
       ON post.post_id = favorite_count_table.post_id
        WHERE (post.post_title LIKE ? OR post.text LIKE ?)
        AND post.emd_id = ?
        `;
        
        // 정렬 기준 추가
        if (sort_by === "price") {
            query += " ORDER BY price ASC;";
        } else if (sort_by === "favorite_count") {
            query += " ORDER BY favorite_count DESC;";
        } else {
            query += " ORDER BY create_at DESC;"; // 기본값으로 정렬
        }
    
        const [rows] = await db.raw(query, [username, `%${search_term}%`, `%${search_term}%`, emd_id]);
        return rows;
    }
    

    static async getFavoritePostsByUsername(username){
        const query = `
        SELECT post.*, 
            1 AS is_favorite, 
            writer.username AS writer_username,
            CASE 
                WHEN favorite_count_table.favorite_count IS NULL THEN 0 
                ELSE favorite_count_table.favorite_count 
            END AS favorite_count
        FROM favorite
        LEFT JOIN post ON favorite.post_id = post.post_id
        LEFT JOIN users AS writer ON post.writer_id = writer.user_id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS favorite_count
            FROM favorite
            GROUP BY post_id
       ) AS favorite_count_table
       ON post.post_id = favorite_count_table.post_id
        WHERE favorite.user_id = (
            SELECT user_id 
            FROM users
            WHERE username = ?
        );
        `;
        const [rows] = await db.raw(query, [username]);
        return rows;
    }

    static async getMyPostsByUsername(username){

        const favorite_count_table = `
            (SELECT post_id, COUNT(*) AS favorite_count
            FROM favorite
            GROUP BY post_id) AS favorite_count_table
        `;

        const user_id = `
            (SELECT user_id 
            FROM users
            WHERE username = ?)
        `;

        const query = `
        SELECT *, 
            post.post_id,writer.username AS writer_username,
            IF(favorite.post_id IS NOT NULL, TRUE, FALSE) as is_favorite,
            COALESCE(favorite_count_table.favorite_count, 0) as favorite_count
        FROM post
        LEFT JOIN users AS writer
            ON post.writer_id = writer.user_id
        LEFT JOIN favorite 
            ON favorite.post_id = post.post_id 
            AND favorite.user_id = 
        LEFT JOIN ${favorite_count_table}
            ON post.post_id = favorite_count_table.post_id
        WHERE post.writer_id = ${user_id};
        `;
        const [rows] = await db.raw(query, [username, username]);
        return rows;
    }

    static async getPostById(username, post_id){

        const favorite_count_table = `
            SELECT post_id, COUNT(*) AS favorite_count
            FROM favorite
            GROUP BY post_id
        `

        const query = `
        SELECT *, post.post_id AS post_id, writer.username AS writer_username,
            IF(favorite.post_id IS NOT NULL, TRUE, FALSE) as is_favorite,
            COALESCE(favorite_count_table.favorite_count, 0) as favorite_count
        FROM post
        LEFT JOIN users AS writer
            ON post.writer_id = writer.user_id
        LEFT JOIN favorite 
            ON favorite.post_id = post.post_id 
            AND favorite.user_id = (
                SELECT user_id 
                FROM users
                WHERE username = ?
            )
        LEFT JOIN (${favorite_count_table}) AS favorite_count_table
            ON post.post_id = favorite_count_table.post_id
        WHERE post.post_id = ?
        `;
        const [rows] = await db.raw(query, [username, post_id]);
        return rows[0];
    }

    static async createPost(input) {
        const { writer_username, ...otherFields } = input;
        const postData = {
            ...otherFields,  // 나머지 필드 통과
            writer_id: db('users').select('user_id').where('username', writer_username).first(), // username => id
            create_at: new Date()  // create_at 설정
        };
        const [postId] = await db('post').insert(postData);
        return postId;
    }
    
    static async updatePost(postData) {
        const {postId, ...updateData } = postData
        result = await DBHelper.patch('post', updateData, { postId })
    }
}

module.exports = PostRepository;