// Server/controller/my-village-controller.js
const MyVillageRepository = require('../repositories/my-village-repository');
const { checkIf } = require('../utils/delete/checkIf')

class MyVillageController {

      static async getMyVillageByUsername(req, res) {
        const username = req.params.username;
        try {
            const myVillage = await MyVillageRepository.getMyVillageByUsername(username);
            if (myVillage) {
                console.log("User's village found: ", myVillage); // 응답 로그 추가
                res.json(myVillage);
            } else {
                console.log("User not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error("Error fetching user's village: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async addMyVillage(req, res) {
        const { username, emdId } = req.body;

        // 유효성 검사
        if (!checkIf(username).isNotNil || !checkIf(emdId).isNotNil) {
            return res.status(400).json({ message: 'Invalid input.' });
        }

        try {
            // 동네 추가 시도
            const result = await MyVillageRepository.addMyVillage(username, emdId);

            if (result.affectedRows > 0) {
                console.log("Village added successfully:", result);
                res.status(201).json({ message: 'Village added successfully.' });
            } else {
                res.status(500).json({ message: 'Failed to add village.' });
            }
        } catch (error) {
            console.error("Error adding village:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MyVillageController;
