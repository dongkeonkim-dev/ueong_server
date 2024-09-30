// Server/Models/Chats.js
const db = require('../utils/db');

class Chats {
    static async getChatsByUsername(username) {
        const query = `
            SELECT *, 
                seller.username AS seller_username, seller.nickname AS seller_nickname,
                buyer.username AS buyer_username, buyer.nickname AS buyer_nickname
            FROM chats
            LEFT JOIN users AS seller ON chats.seller_id = seller.user_id
            LEFT JOIN users AS buyer ON chats.buyer_id = buyer.user_id
            LEFT JOIN messages ON chats.last_message_id = messages.message_id
            WHERE seller.username = ? OR buyer.username = ?
        `;
        const [rows] = await db.query(query, [username, username]);
        return rows;
    }
}

module.exports = Chats;
