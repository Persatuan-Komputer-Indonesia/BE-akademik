import { ProfileRepository } from "../repository/profile.repository";

export const ProfileService = {
  create(data: {
    user_id: string;
    tanggal_lahir: Date;
    no_hp: string;
    jurusan_id: string;
    profile?: string;
  }) {
    if (!data.no_hp.match(/^\d+$/))
      throw new Error("No HP harus angka semua bre!");

    return ProfileRepository.create(data);
  },

  findAll() {
    return ProfileRepository.findAll();
  },

  async findById(id: string) {
    const profile = await ProfileRepository.findById(id);
    if (!profile) throw new Error("Profile tidak ditemukan bre!");
    return profile;
  },

  async findByUserId(user_id: string) {
    const profile = await ProfileRepository.findByUserId(user_id);
    if (!profile) throw new Error("Profile tidak ditemukan bre!");
    return profile;
  },

  async update(
    id: string,
    data: {
      tanggal_lahir?: Date;
      no_hp?: string;
      jurusan_id?: string;
      profile?: string;
    }
  ) {
    if (data.no_hp && !data.no_hp.match(/^\d+$/))
      throw new Error("No HP harus angka semua bre!");

    const profile = await ProfileRepository.findById(id);
    if (!profile) throw new Error("Profile tidak ditemukan bre!");

    return ProfileRepository.update(id, data);
  },

  async delete(id: string) {
    const profile = await ProfileRepository.findById(id);
    if (!profile) throw new Error("Profile tidak ditemukan bre!");

    return ProfileRepository.delete(id);
  },
};
