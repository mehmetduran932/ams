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
        return res.status(400).json({
          success: false,
          message: "Duyuru oluşturulamadı : " + err,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Duyuru Oluşturulamadı : " + err,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allList = await announcement.find();
    return res.status(200).json(allList);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Duyurular getirilemedi: " + err,
    });
  }
};

const isActiveList = async (req, res) => {
  const id = req.body.id;
  try {
    const allList = await announcement.findById(id);
    return res.status(200).json(allList);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Duyurular getirilemedi: " + err,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;

  const updatedData = {
    isActive:req.body.status
  }
  try {
    const updatedAnnouncement = await announcement.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // new: true, güncellenmiş belgeyi döndürür
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Duyuru bulunamadı" });
    }
    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Duyuru güncellenemedi: " + err,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAll,
  isActiveList,
  updateStatus,
};
