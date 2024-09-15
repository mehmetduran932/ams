const staff = require("../models/staffModel");
const errorHandle = require("../exception/errorException");

const createStaff = async (req, res) => {
  try {
    const addStaff = new staff(req.body);

    await addStaff
      .save()
      .then(() => {
        return res.status(201).json(addStaff);
      })
      .catch((err) => {
        errorHandle.errorHandle(res, err, 400, "Personel Oluşturulamadı : ");
      });
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Personel Oluşturulamadı : ");
  }
};

const getAll = async (req, res) => {
  try {
    const collect = await staff.find();
    return res.status(200).json(collect);
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Personel getirilemedi : ");
  }
};

const findId = async (req, res) => {
  const id = req.body.id;
  try {
    const collect = await staff.findById(id);
    return res.status(200).json(collect);
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Personel getirilemedi : ");
  }
};

const updateStaff = async (req, res) => {
  const { id } = req.params;

  const updatedData = {
    isActive: req.body.isACtive,
  };
  try {
    const updatedStaff = await staff.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedStaff) {
      errorHandle.errorHandle(res, "", 404, "Personel bulunamadı : ");
    }
    res.status(200).json(updatedStaff);
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Personel güncellenemedi : ");
  }
};

module.exports = {
  createStaff,
  getAll,
  findId,
  updateStaff,
};
