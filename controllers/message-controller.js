// Server/controller/chat-controller.js
const Message = require('../models/messages');

class MessageController {
    static async getMessagesByChatter(req, res) {
        const username = req.params.username;
        const chatter = req.params.chatter;
        try {
            const messages = await Message.getMessagesByChatter(username, chatter);
            if (messages) {
                console.log("Messages found: ", messages); // 응답 로그 추가
                res.json(messages);
            } else {
                console.log("Messages not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'Messages not found' });
            }
        } catch (err) {
            console.error("Error fetching chat: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = MessageController;
