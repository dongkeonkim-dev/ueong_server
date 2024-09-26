// Server/controller/chat-controller.js
const Chats = require('../models/chats');

class ChatController {
    static async getChatsByUsername(req, res) {
        const username = req.params.username;
        try {
            const chats = await Chats.getChatsByUsername(username);
            if (chats) {
                console.log("Chats found: ", chats); // 응답 로그 추가
                res.json(chats);
            } else {
                console.log("Chats not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'Chats not found' });
            }
        } catch (err) {
            console.error("Error fetching chat: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = ChatController;
