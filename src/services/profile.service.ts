import ProfileRepository from "../repositories/profile.repository";

export default class ProfileService {
  private repo = new ProfileRepository();

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const profile = await this.repo.findById(id);
    if (!profile) throw new Error("Profile tidak ditemukan");
    return profile;
  }

  async create(data: any) {
    const existing = await this.repo.findByUserId(data.user_id);
    if (existing) throw new Error("User sudah memiliki profile");

    return this.repo.create({
      user_id: data.user_id,
      tanggal_lahir: new Date(data.tanggal_lahir),
      no_hp: data.no_hp,
      jurusan_id: data.jurusan_id,
      profile: data.profile ?? null
    });
  }

  async update(id: string, data: any) {
    return this.repo.update(id, {
      ...(data.tanggal_lahir && { tanggal_lahir: new Date(data.tanggal_lahir) }),
      ...(data.no_hp && { no_hp: data.no_hp }),
      ...(data.jurusan_id && { jurusan_id: data.jurusan_id }),
      ...(data.profile !== undefined && { profile: data.profile })
    });
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
