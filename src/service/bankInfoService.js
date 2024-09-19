const bank = require('../models/bankInfoModel');

const addBankInfo = async (req, res) => {
    try {
        const addBankInfo = new bank(req.body);

        await addBankInfo.save().then(() => {
            return res.status(201).json(addBankInfo);
        }).catch((err) => {
            errorHandle.errorHandle(res, err, 400, "Kayıt oluşturulamadı : ");
        });
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kayıt oluşturulamadı : ")
    }
}

const getIbanList = async (req, res) => {
    try {
        const {isOutSource} = req.body
        let filter = {}
        if (isOutSource !== null) {
            filter = {isOutSource: isOutSource}
        }
        const collect = await bank.find(filter)
        return res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "ibanlar getirilemedi : ")
    }
}

module.exports = {
    addBankInfo,
    getIbanList
}