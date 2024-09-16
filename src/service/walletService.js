const wallet = require('../models/walletModel');
const errorHandle = require("../exception/errorException");
const cashCase = require('../models/cashModel');

const getWallet = async (req, res) => {
    try {
        const collect = await wallet.find();
        res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Cüzdan getirilemedi : ");
    }
}

const createWallet = async (req, res) => {
    try {
        const addWallet = new wallet(req.body);

        await addWallet.save().then(() => {
            res.status(201).json(addWallet);
        }).catch((err) => {
            errorHandle.errorHandle(res, err, 400, "Gelir veya Gider oluşturulamadı : ");
        })

    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Gelir veya Gider oluşturulamadı : ");
    }
}

const calculateBalance = async (req, res) => {
    try {
        const totalInMoney = await wallet.aggregate([
            {$match: {inOrOutMoneyType: true}},  // inOrOutMoneyType: true olanları seç
            {$group: {_id: null, total: {$sum: "$price"}}}  // price değerlerini topla
        ]);

        const totalOutMoney = await wallet.aggregate([
            {$match: {inOrOutMoneyType: false}},  // inOrOutMoneyType: false olanları seç
            {$group: {_id: null, total: {$sum: "$price"}}}  // price değerlerini topla
        ]);

        const lastCash = await cashCase.findOne({})
            .sort({createdAt: -1})
            .exec();

        const inMoneyTotal = totalInMoney.length > 0 ? totalInMoney[0].total : 0;
        const outMoneyTotal = totalOutMoney.length > 0 ? totalOutMoney[0].total : 0;

        const moneyDiff = inMoneyTotal - outMoneyTotal

        const balance = lastCash.case - moneyDiff;

        res.status(200).json({
            case: lastCash.case,
            totalInMoney: inMoneyTotal,
            totalOutMoney: outMoneyTotal,
            inOrOutMoneyDiff: moneyDiff,
            balance: balance
        });
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Bakiye hesaplanamadı: ");
    }
};


module.exports = {
    getWallet,
    createWallet,
    calculateBalance
}