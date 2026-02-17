import { LessonRepository } from "../repository/lesson.repository";

export const LessonService = {
  createLesson: async (data: {
    nama: string;
    jurusan_id: string;
    deskripsi?: string;
    url_file?: string;
  }) => {
    if (!data.nama) throw new Error("nama wajib diisi bre!");
    if (!data.jurusan_id) throw new Error("jurusan_id wajib diisi bre!");

    return LessonRepository.create(data);
  },

  getAllLessons: async () => {
    return LessonRepository.findAll();
  },

  getLessonById: async (id: string) => {
    const lesson = await LessonRepository.findById(id);
    if (!lesson) throw new Error("Lesson tidak ditemukan bre!");
    return lesson;
  },

  updateLesson: async (
    id: string,
    data: {
      nama?: string;
      deskripsi?: string;
      url_file?: string;
      jurusan_id?: string;
    }
  ) => {
    const lesson = await LessonRepository.findById(id);
    if (!lesson) throw new Error("Lesson tidak ditemukan bre!");
    return LessonRepository.update(id, data);
  },

  deleteLesson: async (id: string) => {
    const lesson = await LessonRepository.findById(id);
    if (!lesson) throw new Error("Lesson tidak ditemukan bre!");
    return LessonRepository.delete(id);
  },
};
