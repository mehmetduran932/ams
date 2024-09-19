const moneyType = require('../models/inOutMoneyTypes');
const errorHandle = require("../exception/errorException");

const createType = async (req, res) => {
    try {
        const addType = new moneyType(req.body);

        await addType.save().then(() => {
            res.status(201).json(addType);
        }).catch(err => {
            errorHandle.errorHandle(res, err, 400, "Gelir-Gider Tipi oluşturulamadı : ");
        })
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Gelir-Gider Tipi oluşturulamadı : ");
    }
}

const getAll = async (req, res) => {
    try {
        const collect = await moneyType.find();
        res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Gelir-Gider Tipleri getirilemedi : ");

    }
}

module.exports = {
    createType,
    getAll
}