const aboutService = require('../services/aboutService');
const fs = require('fs');
const path = require('path');

const getAbout = async (req, res, next) => {
  try {
    const about = await aboutService.getAbout();
    // Return null or empty object if not found, but usually we return the object
    res.json(about || {});
  } catch (error) {
    next(error);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    const { description, yearExp, totalProj } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const updateData = {
      description,
      yearExp,
      totalProj
    };

    if (req.file) {
      updateData.image = `/uploads/about-img/${req.file.filename}`;

      // Hapus gambar lama dari server jika ada gambar baru
      const oldAbout = await aboutService.getAbout();
      if (oldAbout && oldAbout.image) {
        const oldImagePath = path.join(__dirname, '..', oldAbout.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedAbout = await aboutService.upsertAbout(updateData);
    res.json(updatedAbout);
  } catch (error) {
    next(error);
  }
};

const deleteAbout = async (req, res, next) => {
  try {
    const oldAbout = await aboutService.getAbout();

    if (oldAbout) {
      await aboutService.deleteAbout(oldAbout.id);

      // Hapus gambar fisik dari server jika entri dihapus
      if (oldAbout.image) {
        const oldImagePath = path.join(__dirname, '..', oldAbout.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    res.json({ message: 'About entry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbout,
  updateAbout,
  deleteAbout
};

