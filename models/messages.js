// Server/Models/Chats.js
const db = require('../utils/db');

class Messages {
    static async getMessagesByChatter(username, chatter) {
        const query = `
            SELECT *, 
                sender.username AS sender_username, sender.nickname AS sender_nickname,
                receiver.username AS receiver_username, receiver.nickname AS receiver_nickname
            FROM messages
            LEFT JOIN users AS sender ON messages.sender_id = sender.user_id
            LEFT JOIN users AS receiver ON messages.receiver_id = receiver.user_id
            WHERE (sender.username = ? AND receiver.username = ?) OR (receiver.username = ? AND sender.username = ?)
        `;
        const [rows] = await db.query(query, [username, chatter, username, chatter]);
        return rows;
    }
}

module.exports = Messages;
