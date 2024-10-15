// Server/controller/chat-controller.js
const Address = require('../models/address');
const { check } = require('../utils/check')

class AddressController {
    static async getFullAddressById(req, res) {
        const emdId = req.params.emdId;
        const address = await Address.getFullAddressById(emdId);
        check(address).isFound.assert('address', { emdId })
        res.json(address)
    }

    static async searchAddress(req, res){
        const searchTerm = req.query.searchTerm;
        if(searchTerm.trim() == ""){
            res.status(404).json({message:"no searchTerm"})
        }
        
        try {
            const addressList = await Address.searchAddress(searchTerm);
            if (addressList.length > 0) {
                console.log("Address list found: ", addressList); // 응답 로그 추가
                res.json(addressList);
            } else {
                console.log("No results for search term: ", searchTerm); // 응답 로그 추가
                res.status(201).json([]);
            }
        } catch (err) {
            console.error("Error fetching emd: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static async addMyVillage(req, res) {
        const { username, emdId } = req.body;

        // 유효성 검사
        if (!check(username).isValid || !check(emdId).isValid) {
            return res.status(400).json({ message: 'Invalid input.' });
        }

        try {
            // 동네 추가 시도
            const result = await Address.addMyVillage(username, emdId);

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

module.exports = AddressController;
