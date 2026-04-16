const aboutService = require('../services/aboutService');
const fs = require('fs');
const path = require('path');


const getAbouts = async (req, res, next) => {
  try {
    const abouts = await aboutService.getAbouts();
    res.json(abouts);
  } catch (error) {
    next(error);
  }
};

const getAboutById = async (req, res, next) => {
  try {
    const about = await aboutService.getAboutById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: 'About entry not found' });
    }
    res.json(about);
  } catch (error) {
    next(error);
  }
};

const createAbout = async (req, res, next) => {
  try {
    const { description, yearExp, totalProj } = req.body;
    
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const imagePath = req.file ? `/uploads/about-img/${req.file.filename}` : null;

    const about = await aboutService.createAbout({
      description,
      image: imagePath,
      yearExp,
      totalProj
    });

    res.status(201).json(about);
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
      const oldAbout = await aboutService.getAboutById(req.params.id);
      if (oldAbout && oldAbout.image) {
        const oldImagePath = path.join(__dirname, '..', oldAbout.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedAbout = await aboutService.updateAbout(req.params.id, updateData);
    res.json(updatedAbout);
  } catch (error) {
    next(error);
  }
};

const deleteAbout = async (req, res, next) => {
  try {
    const oldAbout = await aboutService.getAboutById(req.params.id);
    
    await aboutService.deleteAbout(req.params.id);
    
    // Hapus gambar fisik dari server jika entri dihapus
    if (oldAbout && oldAbout.image) {
      const oldImagePath = path.join(__dirname, '..', oldAbout.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.json({ message: 'About entry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbouts,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout
};
