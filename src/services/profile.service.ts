import ProfileRepository from "../repositories/profile.repository";
import fs from "fs";
import path from "path";


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

  async create(data: any, file?: Express.Multer.File) {
    const existing = await this.repo.findByUserId(data.user_id);
    if (existing) throw new Error("User sudah memiliki profile");

    return this.repo.create({
      user_id: data.user_id,
      tanggal_lahir: new Date(data.tanggal_lahir),
      no_hp: data.no_hp,
      jurusan_id: data.jurusan_id,
      profile: file ? `/uploads/profile/${file.filename}` : null
    });
  }

  async update(id: string, data: any, file?: Express.Multer.File) {
    const old = await this.repo.findById(id);
    if (!old) throw new Error("Profile tidak ditemukan");

    // hapus foto lama jika upload baru
    if (file && old.profile) {
      const oldPath = path.join(process.cwd(), old.profile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    return this.repo.update(id, {
      ...(data.tanggal_lahir && { tanggal_lahir: new Date(data.tanggal_lahir) }),
      ...(data.no_hp && { no_hp: data.no_hp }),
      ...(data.jurusan_id && { jurusan_id: data.jurusan_id }),
      ...(file && { profile: `/uploads/profile/${file.filename}` })
    });
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
