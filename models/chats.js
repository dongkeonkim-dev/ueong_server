// Server/Models/Chats.js
const db = require('../utils/db');

class Chats {
    static async getChatsByUsername(username) {
        const query = `
            SELECT 
                u.username AS user_username,
                u.nickname AS user_nickname,
                p.photo_directory AS profile_photo_url,
                CASE 
                    WHEN u.user_id = c.seller_id THEN r.nickname  -- 상대방의 닉네임 (구매자)
                    ELSE s.nickname  -- 상대방의 닉네임 (판매자)
                END AS partner_nickname,
                m.message_text AS last_message_text,
                m.sent_time AS last_message_time,
                c.unread_count AS unread_messages
            FROM users u
            LEFT JOIN chats c ON u.user_id = c.seller_id OR u.user_id = c.buyer_id
            LEFT JOIN messages m ON c.last_message_id = m.message_id
            LEFT JOIN users s ON c.seller_id = s.user_id  -- 판매자
            LEFT JOIN users r ON c.buyer_id = r.user_id   -- 구매자
            LEFT JOIN photo p ON u.profile_photo_id = p.photo_id
            WHERE u.username = ?;  -- 여기에 사용자의 username을 입력
        `; 
        const [rows] = await db.query(query, [username]);
        return rows;
    }
}

module.exports = Chats;
