import prisma from "../prisma";

export const DashboardRepository = {
  countJurusan() {
    return prisma.jurusan.count({
      where: { deletedAt: null },
    });
  },

  countLesson() {
    return prisma.lesson.count({
      where: { deletedAt: null },
    });
  },

  countUser() {
    return prisma.user.count({
      where: { deletedAt: null },
    });
  },

  countAdmin() {
    return prisma.user.count({
      where: {
        deletedAt: null,
        role: "ADMIN",
      },
    });
  },
};