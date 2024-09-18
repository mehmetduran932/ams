const rules = require("../models/rulesModel");
const errorHandle = require("../exception/errorException");

const addRules = async (req, res) => {
    try {
        const rule = new rules(req.body);

        await rule.save().then(() => {
            return res.status(201).json(rule);
        }).catch(err => {
            errorHandle.errorHandle(res, err, 400, "Duyuru Oluşturulamadı : ");
        })
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Duyuru Oluşturulamadı : ");

    }
}

const getAll = async (req, res) => {
    try {
        const collect = await rules.find();
        return res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Duyurular getirilemedi : ");
    }
};

module.exports = {
    addRules,
    getAll
}