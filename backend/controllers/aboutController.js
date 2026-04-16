const aboutService = require('../services/aboutService');

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
    }

    const updatedAbout = await aboutService.updateAbout(req.params.id, updateData);
    res.json(updatedAbout);
  } catch (error) {
    next(error);
  }
};

const deleteAbout = async (req, res, next) => {
  try {
    await aboutService.deleteAbout(req.params.id);
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
