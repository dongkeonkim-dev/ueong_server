// Server/controller/user-controller.js
const Users = require('../models/users');

class UserController {
    static async getUserByUsername(req, res) {
        const username = req.params.username;
        try {
            const user = await Users.getUserByUsername(username);
            if (user) {
                console.log("User found: ", user); // 응답 로그 추가
                res.json(user);
            } else {
                console.log("User not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error("Error fetching user: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = UserController;
