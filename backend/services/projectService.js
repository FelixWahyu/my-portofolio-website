const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProjects = async () => {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const getProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: { id: parseInt(id) },
  });
};

const createProject = async (data) => {
  return await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      tech: data.tech,
      link: data.link,
      image: data.image,
    },
  });
};

const updateProject = async (id, data) => {
  return await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      description: data.description,
      tech: data.tech,
      link: data.link,
      image: data.image,
    },
  });
};

const deleteProject = async (id) => {
  return await prisma.project.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
