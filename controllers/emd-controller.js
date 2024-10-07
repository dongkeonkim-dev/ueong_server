// Server/controller/my-village-controller.js
const Emd = require('../models/emd');

class EmdController {
    static async getMyVillageByUsername(req, res) {
        const username = req.params.username;
        try {
            const myVillage = await Emd.getMyVillageByUsername(username);
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

    static async getEmd(req, res){
        const emdId = req.params.emdId;
        try {
            const emd = await Emd.getEmd(emdId);
            if (emd) {
                console.log("emd found: ", emd); // 응답 로그 추가
                res.json(emd);
            } else {
                console.log("emd not found: ", emdId); // 응답 로그 추가
                res.status(404).json({ message: 'emd not found' });
            }
        } catch (err) {
            console.error("Error fetching emd: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = EmdController;
