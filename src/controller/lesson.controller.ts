import { Request, Response } from "express";
import { LessonService } from "../services/lesson.service";

const getParam = (param: string | string[]) => Array.isArray(param) ? param[0] : param;

// CREATE
export const createLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await LessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL
export const getAllLessons = async (_: Request, res: Response) => {
  try {
    const lessons = await LessonService.getAllLessons();
    res.json(lessons);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getLessonById = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const lesson = await LessonService.getLessonById(id);
    res.json(lesson);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const updateLesson = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const lesson = await LessonService.updateLesson(id, req.body);
    res.json(lesson);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    await LessonService.deleteLesson(id);
    res.json({ message: "Lesson berhasil dihapus" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
