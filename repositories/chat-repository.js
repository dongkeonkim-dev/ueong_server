// Server/Models/Chats.js
const db = require('../utils/knex');

class Chats {
    static async getChatsByUsername(username) {
        const query =
        `
        SELECT 
            u.username AS user_username,
            u.nickname AS user_nickname,
            CASE 
                WHEN u.user_id = c.seller_id THEN r.nickname  -- 상대방의 닉네임 (구매자)
                ELSE s.nickname  -- 상대방의 닉네임 (판매자)
            END AS partner_nickname,
            CASE 
                WHEN u.user_id = c.seller_id THEN r.profile_photo_url  -- 상대방의 프로필 사진 (구매자)
                ELSE s.profile_photo_url  -- 상대방의 프로필 사진 (판매자)
            END AS partner_profile_photo_url,  -- 상대방의 프로필 사진
            m.message_text AS last_message_text,
            m.sent_time AS last_message_time,
            c.chat_id,  -- 채팅 ID 추가
            c.post_id,  -- 포스트 ID 추가
            -- 읽지 않은 메시지 수를 계산하는 부분
            (
                SELECT COUNT(*)
                FROM messages msg
                WHERE msg.chat_id = c.chat_id
                AND msg.is_read = 0  -- 읽지 않은 메시지
                AND msg.sender_id <> u.user_id  -- 상대방이 보낸 메시지
            ) AS unread_messages
        FROM users u
        LEFT JOIN chats c ON u.user_id = c.seller_id OR u.user_id = c.buyer_id
        LEFT JOIN messages m ON c.last_message_id = m.message_id
        LEFT JOIN users s ON c.seller_id = s.user_id  -- 판매자
        LEFT JOIN users r ON c.buyer_id = r.user_id   -- 구매자
        WHERE u.username = ?;  -- 여기에 사용자의 username을 입력
        `; 
        const [rows] = await db.raw(query, [username]);
        return rows;
    }
}

module.exports = Chats;
