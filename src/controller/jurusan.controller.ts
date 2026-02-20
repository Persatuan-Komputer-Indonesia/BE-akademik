import { Request, Response } from "express";
import { JurusanService } from "../services/jurusan.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";

const getParam = (param: string | string[]) =>
  Array.isArray(param) ? param[0] : param;

export const createJurusan = asyncHandler(async (req: Request, res: Response) => {
  const { nama_jurusan, deskripsi } = req.body;
  if (!nama_jurusan) throw new AppError("nama_jurusan wajib diisi", 400);

  const jurusan = await JurusanService.create({ nama_jurusan, deskripsi });
  res.status(201).json(jurusan);
});

export const getAllJurusan = asyncHandler(async (_: Request, res: Response) => {
  const jurusan = await JurusanService.findAll();
  res.json(jurusan);
});

export const getJurusanById = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  const jurusan = await JurusanService.findById(id as any);
  if (!jurusan) throw new AppError("Jurusan tidak ditemukan", 404);

  res.json(jurusan);
});

export const updateJurusan = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  const jurusan = await JurusanService.update(id as any, req.body);
  res.json(jurusan);
});

export const deleteJurusan = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  await JurusanService.delete(id as any);
  res.json({ message: "Jurusan berhasil dihapus" });
});
