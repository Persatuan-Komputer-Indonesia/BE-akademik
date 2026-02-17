import prisma from "../prisma";

export const LessonRepository = {
  // CREATE
  create(data: {
    nama: string;
    deskripsi?: string;
    jurusan_id: string;
    url_file?: string;
  }) {
    return prisma.lesson.create({ data });
  },

  // GET ALL (HANYA YANG AKTIF)
  findAll() {
    return prisma.lesson.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        jurusan: true,
      },
    });
  },

  // GET BY ID (HANYA YANG AKTIF)
  findById(id: string) {
    return prisma.lesson.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        jurusan: true,
      },
    });
  },

  // UPDATE (HANYA YANG AKTIF)
  update(
    id: string,
    data: {
      nama?: string;
      deskripsi?: string;
      url_file?: string;
      jurusan_id?: string;
    }
  ) {
    return prisma.lesson.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  },

  // SOFT DELETE
  delete(id: string) {
    return prisma.lesson.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  // RESTORE (OPSIONAL, TAPI PRO 😎)
  restore(id: string) {
    return prisma.lesson.updateMany({
      where: {
        id,
        deletedAt: { not: null },
      },
      data: {
        deletedAt: null,
      },
    });
  },
};
