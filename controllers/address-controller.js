// Server/controller/chat-controller.js
const Address = require('../models/address');

class AddressController {
    static async getFullAddressById(req, res) {
        const username = req.params.emdId;
        try {
            const address = await Address.getFullAddressById(username);
            if (address) {
                console.log("Address found: ", address); // 응답 로그 추가
                res.json(address);
            } else {
                console.log("Address not found: ", emdId); // 응답 로그 추가
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (err) {
            console.error("Error fetching Address: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = AddressController;
