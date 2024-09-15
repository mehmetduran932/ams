const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/usersModel");
const errorHandle = require("../exception/errorException");

const loginService = async (req, res) => {
  try {
    const { gsm, password } = req.body;
    const user = await users.findOne({ gsm });
    if (!user) {
      errorHandle.errorHandle(res, "", 401, "Authentication failed");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      errorHandle.errorHandle(res, "", 401, "Authentication failed");
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name,
        surname: user.surname,
        gsm: user.gsm,
        room: user.room,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, msg);
  }
};

module.exports = {
  loginService,
};
