const cashCase = require('../models/cashModel');
const errorHandle = require("../exception/errorException");


const addCash = async (req, res) => {
    try {

        if (req.body.role !== 'ADMIN') {
            return res.status(403).send("Yetkisiz Erişim...")
        }
        const cash = new cashCase(req.body);

        await cash.save().then(() => {
            return res.status(201).json(cash);
        }).catch(err => {
            errorHandle.errorHandle(res, err, 400, "Kasa Güncellenemedi : ");
        })
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kasa Oluşturulamadı : ");
    }
}

const getAllCash = async (req, res) => {
    try {
        const collect = await cashCase.find();
        return res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kasa getirilemedi : ");
    }
}

const getLastCash = async (req, res) => {
    try {
        const doc = await cashCase.findOne({})
            .sort({ createdAt: -1 })
            .exec();
        if (doc) {
            return res.status(200).json(doc);
        } else {
            return res.status(404).json({ message: "No documents found." });
        }
    } catch (err) {
        return errorHandle.errorHandle(res, err, 500, "Kasa getirilemedi : ");
    }
}

module.exports = {
    addCash,
    getAllCash,
    getLastCash
}