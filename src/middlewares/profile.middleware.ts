import { Request, Response, NextFunction } from "express";

export function validateCreateProfile(req: Request, res: Response, next: NextFunction) {
  const { user_id, tanggal_lahir, no_hp, jurusan_id } = req.body;

  if (!user_id || !tanggal_lahir || !no_hp || !jurusan_id) {
    return res.status(400).json({
      message: "user_id, tanggal_lahir, no_hp, jurusan_id wajib diisi"
    });
  }

  next();
}
