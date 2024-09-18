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


        const lastCash = await getLastCash()

        let calcCash = 0
        if (req.body.inOrOutMoneyType) {
            calcCash = lastCash.case + req.body.price
        } else {
            calcCash = lastCash.case - req.body.price
        }

        const cash = new cashCase({
            case: calcCash,
            gsm: req.body.gsm,
            role: req.body.role
        });

        await cash.save().then(() => {
        }).catch(err => {
            errorHandle.errorHandle(res, err, 400, "Kasa Güncellenemedi : ");
        })

        await addWallet.save().then(() => {
            res.status(201).json(addWallet);
        }).catch((err) => {
            errorHandle.errorHandle(res, err, 400, "Gelir veya Gider oluşturulamadı : ");
        })

    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Gelir veya Gider oluşturulamadı : ");
    }
}

const getMoneyTotal = async (inOrOutMoneyType) => {
    try {
        return await wallet.aggregate([
            {$match: {inOrOutMoneyType: inOrOutMoneyType}},  // inOrOutMoneyType: true olanları seç
            {$group: {_id: null, total: {$sum: "$price"}}}  // price değerlerini topla
        ]);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Bakiye hesaplanamadı: ");
    }
}


const calculateBalance = async (req, res) => {
    try {
        const totalInMoney = getMoneyTotal(true)

        const totalOutMoney = getMoneyTotal(false)

        const lastCash = await getLastCash()

        const inMoneyTotal = totalInMoney.length > 0 ? totalInMoney[0].total : 0;
        const outMoneyTotal = totalOutMoney.length > 0 ? totalOutMoney[0].total : 0;

        const moneyDiff = inMoneyTotal - outMoneyTotal


        res.status(200).json({
            case: lastCash.case.toFixed(2),
            totalInMoney: inMoneyTotal,
            totalOutMoney: outMoneyTotal,
            inOrOutMoneyDiff: moneyDiff
        });
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Bakiye hesaplanamadı: ");
    }
};

const getMoneyFilter = async (req, res) => {
    try {
        const {inOrOutMoneyType} = req.body
        const inMoney = await wallet.find({inOrOutMoneyType: inOrOutMoneyType});
        const getTotal = await getMoneyTotal(inOrOutMoneyType)
        return res.status(200).json({inMoney, total: getTotal[0].total.toFixed(2)});
    } catch (err) {
        return errorHandle.errorHandle(res, err, 500, "Gelirler getirilemedi : ");
    }
}

const getLastCash = async (req, res) => {
    try {
        return await cashCase.findOne({})
            .sort({createdAt: -1})
            .exec();
    } catch (err) {
        return errorHandle.errorHandle(res, err, 500, "Kasa getirilemedi : ");
    }
}


module.exports = {
    getWallet,
    createWallet,
    calculateBalance,
    getMoneyFilter
}