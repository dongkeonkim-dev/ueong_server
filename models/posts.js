// Server/Models/Posts.js
const db = require('../utils/db');
const DBHelper = require('../utils/DBHelper')

class Posts {
    static async searchPosts(username, village, searchTerm, sortBy) {
        console.log(username, village, searchTerm, sortBy)
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
        if (sortBy === "price") {
            query += " ORDER BY price ASC;";
        } else if (sortBy === "favoriteCount") {
            query += " ORDER BY favorite_count DESC;";
        } else {
            query += " ORDER BY create_at DESC;"; // 기본값으로 정렬
        }
    
        const [rows] = await db.query(query, [username, `%${searchTerm}%`, `%${searchTerm}%`, village]);
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
        const [rows] = await db.query(query, [username]);
        return rows;
    }

    static async getMyPostsByUsername(username){
        const query = `
        SELECT *, post.post_id,writer.username AS writer_username,
            CASE 
                WHEN favorite.post_id IS NOT NULL THEN TRUE 
                ELSE FALSE 
            END AS is_favorite,
            CASE 
            WHEN favorite_count_table.favorite_count IS NULL THEN 0 
            ELSE favorite_count_table.favorite_count 
        END AS favorite_count
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
        WHERE post.writer_id = (
            SELECT user_id 
            FROM users
            WHERE username = ?
        );
        `;
        const [rows] = await db.query(query, [username, username]);
        return rows;
    }

    static async getPostById(username, postId){
        const query = `
        SELECT *, post.post_id AS post_id, writer.username AS writer_username,
            CASE 
                WHEN favorite.post_id IS NOT NULL THEN TRUE 
                ELSE FALSE 
            END AS is_favorite,
            CASE 
            WHEN favorite_count_table.favorite_count IS NULL THEN 0 
            ELSE favorite_count_table.favorite_count 
        END AS favorite_count
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
        WHERE post.post_id = ?
        `;
        const [rows] = await db.query(query, [username, postId]);
        return rows[0];
    }

    static async createPost(postData) {
        try {
            const {
                title, categoryId, price, writerUsername, emdId,
                latitude, longitude, locationDetail, text
            } = postData;

            console.log("Post data:", postData); // 값 확인을 위한 로그

            // 필요한 데이터를 객체로 구성
            const postBody = {
                post_title: title,
                category_id: categoryId,
                status: "거래대기",
                price,
                writer_id: { 
                    subQuery: "SELECT user_id FROM users WHERE username = ?", 
                    params: [writerUsername] // 서브쿼리에 사용할 파라미터
                },
                emd_id: emdId,
                desired_trading_location_latitude: latitude,
                desired_trading_location_longitude: longitude,
                desired_trading_location_detail: locationDetail,
                text,
                create_at: new Date(), // 현재 시간으로 설정
                is_active: 1
            };

            // DBHelper의 insert 함수 호출
            const result = await DBHelper.insert('post', postBody);
    
            // 쿼리 실행 후 결과 확인
            console.log("Insert result:", result);
            if (result.affectedRows === 0) {
                console.error("Failed to insert the post into the database.");
                throw new Error("Database insertion failed.");
            }
    
            return result.insertId; // 생성된 게시물 ID 반환
        } catch (error) {
            console.error('Error creating post:', error);
            throw error; // 호출하는 곳에서 처리할 수 있도록 오류 다시 던지기
        }
    }
    
    static async updatePost(postData) {
        const {postId, ...updateData } = postData
        result = await DBHelper.patch('post', updateData, { postId })
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