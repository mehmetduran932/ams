const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const addUsers = async (req, res) => {
  try {
    const { name, surname, gsm, mail, password, role, isActive, room } =
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

module.exports = {
  addUsers,
  getAllUsers,
};
