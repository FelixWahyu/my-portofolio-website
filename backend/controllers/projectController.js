const projectService = require('../services/projectService');
const fs = require('fs');
const path = require('path');
const { z } = require('zod');

// Schema validation for Project
const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required'),
  tech: z.string().min(1, 'At least one tech stack is required').max(255),
  link: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const validatedData = ProjectSchema.parse(req.body);
    
    const projectData = {
      ...validatedData,
      image: req.file ? `/uploads/about-img/${req.file.filename}` : null, // Reusing about-img folder or we could create project-img
    };

    const newProject = await projectService.createProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.errors.map(err => ({ field: err.path[0], message: err.message })) 
      });
    }
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const validatedData = ProjectSchema.parse(req.body);
    const existingProject = await projectService.getProjectById(req.params.id);
    
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updateData = {
      ...validatedData,
    };

    if (req.file) {
      updateData.image = `/uploads/about-img/${req.file.filename}`;

      // Delete old image
      if (existingProject.image) {
        const oldImagePath = path.join(__dirname, '..', existingProject.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedProject = await projectService.updateProject(req.params.id, updateData);
    res.json(updatedProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.errors.map(err => ({ field: err.path[0], message: err.message })) 
      });
    }
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from server
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await projectService.deleteProject(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
