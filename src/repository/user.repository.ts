import prisma from "../prisma";

export const UserRepository = {
  // CREATE
  create(data: {
    username: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
  }) {
    return prisma.user.create({ data });
  },

  // GET ALL (HANYA USER AKTIF)
  findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return prisma.$transaction([
      prisma.user.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          profile: true,
        },
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
      }),
      prisma.user.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);
  },

  // GET BY ID (HANYA USER AKTIF)
  findById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        profile: true,
      },
    });
  },

  // GET BY EMAIL (BUAT LOGIN 🔐)
  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
      include: {
        profile: true,
      },
    });
  },

  // UPDATE (HANYA USER AKTIF)
  update(
    id: string,
    data: Partial<{
      username: string;
      email: string;
      password: string;
      role: "ADMIN" | "USER";
    }>
  ) {
    return prisma.user.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  },

  // SOFT DELETE USER
  delete(id: string) {
    return prisma.user.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  // RESTORE USER (ADMIN ONLY )
  restore(id: string) {
    return prisma.user.updateMany({
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
