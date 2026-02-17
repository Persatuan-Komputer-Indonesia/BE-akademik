import prisma from "../prisma";

export const JurusanRepository = {
  create(data: { nama_jurusan: string; deskripsi?: string }) {
    return prisma.jurusan.create({ data });
  },

  findAll() {
    return prisma.jurusan.findMany({
      where: {
        deletedAt: null,
      },
    });
  },

  findById(id: string) {
    return prisma.jurusan.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  update(
    id: string,
    data: { nama_jurusan?: string; deskripsi?: string }
  ) {
    return prisma.jurusan.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.jurusan.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
