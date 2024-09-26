// Server/Models/Chats.js
const db = require('../utils/db');

class Chats {
    static async getChatsByUsername(username) {
        const query = `
            SELECT *, 
                sender.username AS sender_username, sender.nickname AS sender_nickname,
                receiver.username AS receiver_username, receiver.nickname AS receiver_nickname
            FROM chats
            LEFT JOIN users AS sender ON chats.user_id1 = sender.user_id
            LEFT JOIN users AS receiver ON chats.user_id2 = receiver.user_id
            LEFT JOIN messages ON chats.last_message_id = messages.message_id
            WHERE sender.username = ? OR receiver.username = ?
        `;
        const [rows] = await db.query(query, [username, username]);
        return rows;
    }
}

module.exports = Chats;
