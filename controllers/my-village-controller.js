// Server/controller/my-village-controller.js
const MyVillage = require('../models/my-village');

class MyVillageController {
    static async getMyVillageByUserId(req, res) {
        const userId = req.params.userId;
        try {
            const myVillage = await MyVillage.getMyVillageByUserId(userId);
            if (myVillage) {
                console.log("User's village found: ", myVillage); // 응답 로그 추가
                res.json(myVillage);
            } else {
                console.log("User not found: ", userId); // 응답 로그 추가
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error("Error fetching user's village: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = MyVillageController;
