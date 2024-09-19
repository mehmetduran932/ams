const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

const addUsers = async (req, res) => {
    try {
        const {name, surname, gsm, mail, password, role, isActive, room} =
            req.body;

        const getHashPassword = await hashPassword(password);

        const addUser = new users({
            name: name,
            surname: surname,
            gsm: gsm,
            mail: mail,
            password: getHashPassword,
            isActive: isActive,
            room: room,
            role: role,
        });

        await addUser
            .save()
            .then(() => {
                return res.status(201).json(addUser);
            })
            .catch((err) => {
                errorHandle.errorHandle(res, err, 400, "Kayıt oluşturulamadı : ");
            });
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kayıt oluşturulamadı : ");
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        return res.status(200).json(allUsers);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kullanıcılar getirilemedi : ");
    }
};

const updateUserRole = async (req, res) => {
    const {id} = req.params;

    const updateData = {
        role: req.body.role,
    }
    try {
        const updateUser = await users.findByIdAndUpdate(id, updateData, {new: true})
        if (!updateData) {
            errorHandle.errorHandle(res, "", 404, "Kullanıcı bulunamadı : ");
        }
        res.status(200).json(updateUser);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kullanıcı güncellenemedi : ");

    }
}

const updateUserIsActive = async (req, res) => {
    const {id} = req.params;

    const updateData = {
        isActive: req.body.isActive,
    }
    try {
        const updateUser = await users.findByIdAndUpdate(id, updateData, {new: true})
        if (!updateData) {
            errorHandle.errorHandle(res, "", 404, "Kullanıcı bulunamadı : ");
        }
        res.status(200).json(updateUser);
    } catch (err) {
        errorHandle.errorHandle(res, err, 500, "Kullanıcı güncellenemedi : ");
    }
}

module.exports = {
    addUsers,
    getAllUsers,
    updateUserRole,
    updateUserIsActive
};
