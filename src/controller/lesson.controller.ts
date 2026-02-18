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

export const getLessonById = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  const lesson = await LessonService.getLessonById(id);
  res.json(lesson);
});

export const updateLesson = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  const lesson = await LessonService.updateLesson(id, req.body);
  res.json(lesson);
});

export const deleteLesson = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  await LessonService.deleteLesson(id);
  res.json({ message: "Lesson berhasil dihapus" });
});
