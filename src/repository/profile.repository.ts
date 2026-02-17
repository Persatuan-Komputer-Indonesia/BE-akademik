import prisma from "../prisma";

export const ProfileRepository = {
  // CREATE
  create(data: {
    user_id: string;
    tanggal_lahir: Date;
    no_hp: string;
    jurusan_id: string;
    profile?: string;
  }) {
    return prisma.profile.create({ data });
  },

  // GET ALL (HANYA YANG AKTIF)
  findAll() {
    return prisma.profile.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        user: true,
        jurusan: true,
      },
    });
  },

  // GET BY ID (HANYA YANG AKTIF)
  findById(id: string) {
    return prisma.profile.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: true,
        jurusan: true,
      },
    });
  },

  // GET BY USER ID (HANYA YANG AKTIF)
  findByUserId(user_id: string) {
    return prisma.profile.findFirst({
      where: {
        user_id,
        deletedAt: null,
      },
      include: {
        user: true,
        jurusan: true,
      },
    });
  },

  // UPDATE (HANYA YANG AKTIF)
  update(
    id: string,
    data: {
      tanggal_lahir?: Date;
      no_hp?: string;
      jurusan_id?: string;
      profile?: string;
    }
  ) {
    return prisma.profile.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  },

  // SOFT DELETE
  delete(id: string) {
    return prisma.profile.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  // RESTORE (OPSIONAL TAPI PRO)
  restore(id: string) {
    return prisma.profile.updateMany({
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
