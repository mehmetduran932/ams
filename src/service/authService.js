const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/usersModel");

const loginService = async (req, res) => {
  try {
    const { gsm, password } = req.body;
    const user = await users.findOne({ gsm });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
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
    return res.status(500).json({
      success: false,
      message: "Giriş Yapılamadı Sistem Yöneticisine Başvurunuz : " + err,
    });
  }
};

module.exports = {
  loginService,
};
