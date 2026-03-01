import { Request, Response } from "express";
import { LessonService } from "../services/lesson.service";
import { asyncHandler } from "../utils/asyncHandler";

const getParam = (param: string | string[]) =>
  Array.isArray(param) ? param[0] : param;

export const createLesson = asyncHandler(async (req: Request, res: Response) => {
  const lesson = await LessonService.createLesson(req.body);
  res.status(201).json(lesson);
});

export const getAllLessons = asyncHandler(async (_: Request, res: Response) => {
  const lessons = await LessonService.getAllLessons();
  res.json(lessons);
});

// GET BY ID
export const getLessonById = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    const lesson = await LessonService.getLessonById(id!);
    res.json(lesson);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const updateLesson = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    const lesson = await LessonService.updateLesson(id!, req.body);
    res.json(lesson);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    await LessonService.deleteLesson(id!);
    res.json({ message: "Lesson berhasil dihapus"});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
