const announcement = require("../models/announcementModel");

const createAnnouncement = async (req, res) => {
  try {
    const { title, description, isActive } = req.body;
    const addAnnouncement = new announcement({
      title: title,
      description: description,
      isActive: isActive,
    });
    await addAnnouncement
      .save()
      .then(() => {
        return res.status(201).json(addAnnouncement);
      })
      .catch((err) => {
        errorHandle.errorHandle(res, err, 400, "Duyuru oluşturulamadı : ");
      });
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Duyuru oluşturulamadı : ");
  }
};

const getAll = async (req, res) => {
  try {
    const allList = await announcement.find();
    return res.status(200).json(allList);
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Duyurular getirilemedi : ");
  }
};

const isActiveList = async (req, res) => {
  const id = req.body.id;
  try {
    const allList = await announcement.findById(id);
    return res.status(200).json(allList);
  } catch (err) {
    errorHandle.errorHandle(res, err, 500, "Duyurular getirilemedi : ");
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;

  const updatedData = {
    isActive: req.body.status,
  };
  try {
    const updatedAnnouncement = await announcement.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedAnnouncement) {
      errorHandle.errorHandle(res, "", 400, "Duyurular bulunamadı : ");
    }
    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    errorHandle.errorHandle(res, "", 500, "Duyuru güncellenemedi : ");
  }
};

module.exports = {
  createAnnouncement,
  getAll,
  isActiveList,
  updateStatus,
};
