const tenant = require("../models/tenantModel");
const errorHandle = require("../exception/errorException");

const tenantCreate = async (req, res) => {
    const addTenant = new tenant(req.body);
    try {
        await addTenant.save().then(() => {
            return res.status(201).json(addTenant).catch((err) => {
                errorHandle.errorHandle(res, err, 400, "Kiracı Oluşturulamadı : ");
            });
        })
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kiracı Oluşturulamadı : ");
    }
}

const updateTenant = async (req, res) => {
    const {id} = req.params;

    const updateData = {
        isActive: req.body.isActive,
    }

    try {
        const tenantUpdate = await tenant.findByIdAndUpdate(id, updateData, {
            new: true,
        })
        if (!tenantUpdate) {
            errorHandle.errorHandle(res, "", 404, "Kiracı bulunamadı : ");
        }
        res.status(200).json(tenantUpdate);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kiracı güncellenemedi : ");
    }
}

const getAllTenant = async (req, res) => {
    try {
        const collect = await tenant.find();
        res.status(200).json(collect);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kiracı getirilemedi : ");
    }
}

module.exports = {
    tenantCreate,
    updateTenant,
    getAllTenant
}