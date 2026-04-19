const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAbout = async () => {
  return await prisma.about.findFirst({
    orderBy: { createdAt: 'desc' }
  });
};

const upsertAbout = async (data) => {
  const existingAbout = await prisma.about.findFirst({
    orderBy: { createdAt: 'asc' }
  });

  const aboutData = {
    description: data.description,
    yearExp: (data.yearExp !== undefined && data.yearExp !== '' && data.yearExp !== null) ? parseInt(String(data.yearExp), 10) : null,
    totalProj: (data.totalProj !== undefined && data.totalProj !== '' && data.totalProj !== null) ? parseInt(String(data.totalProj), 10) : null,
  };

  if (data.image) {
    aboutData.image = data.image;
  }

  if (existingAbout) {
    return await prisma.about.update({
      where: { id: existingAbout.id },
      data: aboutData
    });
  } else {
    return await prisma.about.create({
      data: aboutData
    });
  }
};

const getAboutById = async (id) => {
  return await prisma.about.findUnique({
    where: { id: parseInt(id) }
  });
};

const deleteAbout = async (id) => {
  return await prisma.about.delete({
    where: { id: parseInt(id) }
  });
};

module.exports = {
  getAbout,
  upsertAbout,
  getAboutById,
  deleteAbout
};

