const staff = require("../models/staffModel");

const createStaff = async (req, res) => {
  try {
    const addStaff = new staff(req.body);

    await addStaff
      .save()
      .then(() => {
        return res.status(201).json(addStaff);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "Personel oluşturulamadı : " + err,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Personel Oluşturulamadı : " + err,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const collect = await staff.find();
    return res.status(200).json(collect);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Personel getirilemedi: " + err,
    });
  }
};

const findId = async (req, res) => {
  const id = req.body.id;
  try {
    const collect = await staff.findById(id);
    return res.status(200).json(collect);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Personel getirilemedi: " + err,
    });
  }
};

const updateStaff = async (req, res) => {
  const { id } = req.params;

  const updatedData = {
    isActive: req.body.isACtive,
  };
  try {
    const updatedStaff = await staff.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // new: true, güncellenmiş belgeyi döndürür
    );
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff bulunamadı" });
    }
    res.status(200).json(updatedStaff);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Staff güncellenemedi: " + err,
    });
  }
};

module.exports = {
  createStaff,
  getAll,
  findId,
  updateStaff,
};
