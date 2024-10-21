// Server/controller/chat-controller.js
const AddressRepository = require('../repositories/address-repository');
const { Object, String, Number, Integer, Natural, Binary, Email, Enum } = require('../utils/custom-zod-types')
const { checkIf } = require('../utils/delete/checkIf')

const Address = Object({
    emdId: Natural
});

const Search = Object({
    searchTerm: String.optional()
})

class AddressController {
    static async getFullAddressById(req, res) {
        console.log(`[params]: ${JSON.stringify(req.params)}`)
        const input = Address.pick({ emdId: true }).parse(req.params)
        const address = await AddressRepository.getFullAddressById(input.emdId);
        res.json(address)
    }

    static async searchAddress(req, res){
        const searchTerm = req.query.searchTerm;
    
        if(searchTerm.trim() == ""){
            res.status(404).json({message:"no searchTerm"})
        }
        
        const addressList = await AddressRepository.searchAddress(searchTerm);
        if (addressList.length > 0) {
            console.log("Address list found: ", addressList); // 응답 로그 추가
            res.json(addressList);
        } else {
            console.log("No results for search term: ", searchTerm); // 응답 로그 추가
            res.status(201).json([]);
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
            const result = await AddressRepository.addMyVillage(username, emdId);

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

    static async getEmd(req, res){
        const emdId = req.params.emdId;
        try {
            const emd = await AddressRepository.getEmd(emdId);
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

module.exports = AddressController;
