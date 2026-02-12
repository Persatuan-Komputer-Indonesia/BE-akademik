import prisma from "../prisma";
import { Profile } from "../generated/prisma";

export default class ProfileRepository {

  async findAll(): Promise<Profile[]> {
    return prisma.profile.findMany({
      include: {
        user: true,
        jurusan: true
      }
    });
  }

  async findById(id: string): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: { id },
      include: {
        user: true,
        jurusan: true
      }
    });
  }

  async findByUserId(user_id: string): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: { user_id }
    });
  }

  async create(data: any): Promise<Profile> {
    return prisma.profile.create({ data });
  }

  async update(id: string, data: any): Promise<Profile> {
    return prisma.profile.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<Profile> {
    return prisma.profile.delete({
      where: { id }
    });
  }
}
