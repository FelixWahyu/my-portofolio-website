const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAbouts = async () => {
  return await prisma.about.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const getAboutById = async (id) => {
  return await prisma.about.findUnique({
    where: { id: parseInt(id) }
  });
};

const createAbout = async (data) => {
  return await prisma.about.create({
    data: {
      description: data.description,
      image: data.image || null,
      yearExp: data.yearExp ? parseInt(data.yearExp) : null,
      totalProj: data.totalProj ? parseInt(data.totalProj) : null,
    }
  });
};

const updateAbout = async (id, data) => {
  const updateData = {
    description: data.description,
    yearExp: data.yearExp ? parseInt(data.yearExp) : null,
    totalProj: data.totalProj ? parseInt(data.totalProj) : null,
  };

  if (data.image) {
    updateData.image = data.image;
  }

  return await prisma.about.update({
    where: { id: parseInt(id) },
    data: updateData
  });
};

const deleteAbout = async (id) => {
  return await prisma.about.delete({
    where: { id: parseInt(id) }
  });
};

module.exports = {
  getAbouts,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout
};
