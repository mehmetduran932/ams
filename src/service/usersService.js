const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const errorHandle = async (mail, gsm) => {
  console.log("geldi");
  const isEmailAllReadyExist = await users.findOne({
    mail: mail,
  });
  console.log("isEmail", isEmailAllReadyExist);
  if (isEmailAllReadyExist) {
    res.status(400).json({
      status: 400,
      message: "Email all ready in use",
    });
    return;
  }

  const isGsmAllReadyExist = await users.findOne({
    gsm: gsm,
  });
  console.log(isGsmAllReadyExist);
  if (isGsmAllReadyExist) {
    res.status(400).json({
      status: 400,
      message: "Email all ready in use",
    });
    return;
  }
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
        return res.status(400).json({
          success: false,
          message: "Kayıt oluşturulamadı : " + err,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Kayıt oluşturulamadı : " + err,
    });
  }
};

module.exports = {
  addUsers,
};
