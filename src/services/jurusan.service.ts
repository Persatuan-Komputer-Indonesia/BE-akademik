import { JurusanRepository } from "../repository/jurusan.repository";

export const JurusanService = {
  // CREATE
  async create(data: { nama_jurusan: string; deskripsi?: string }) {
    if (!data.nama_jurusan) {
      throw new Error("nama_jurusan wajib diisi bre!");
    }

    return JurusanRepository.create(data);
  },

  // GET ALL
  async findAll() {
    return JurusanRepository.findAll();
  },

  // GET BY ID
  async findById(id: string) {
    const jurusan = await JurusanRepository.findById(id);
    if (!jurusan) {
      throw new Error("Jurusan tidak ditemukan bre!");
    }
    return jurusan;
  },

// UPDATE
async update(
  id: string,
  data: { nama_jurusan?: string; deskripsi?: string }
) {
  const jurusan = await JurusanRepository.findById(id);
  if (!jurusan) {
    throw new Error("Jurusan tidak ditemukan bre!");
  }
  return JurusanRepository.update(id, data);
},

// DELETE
 async delete(id: string) {
    const jurusan = await JurusanRepository.findById(id);
    if (!jurusan) throw new Error("Jurusan tidak ditemukan bre!");
    return JurusanRepository.softDelete(id);
  },

  // 🔄 restore jurusan
  async restore(id: string) {
    const jurusan = await JurusanRepository.restore(id);
    if(!jurusan) throw new Error("Jurusan tidak di temukan!!");
    return jurusan
  },
};

