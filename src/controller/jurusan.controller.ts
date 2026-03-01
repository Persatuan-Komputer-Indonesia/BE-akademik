import { Request, Response } from "express";
import { JurusanService } from "../services/jurusan.service";

// helper ambil param aman
const getParam = (param: string | string[]) => Array.isArray(param) ? param[0] : param;

// CREATE JURUSAN
export const createJurusan = async (req: Request, res: Response) => {
  try {
    const { nama_jurusan, deskripsi } = req.body;
    if (!nama_jurusan) return res.status(400).json({ message: "nama_jurusan wajib diisi" });

    const jurusan = await JurusanService.create({ nama_jurusan, deskripsi });
    res.status(201).json(jurusan);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL JURUSAN
export const getAllJurusan = async (_: Request, res: Response) => {
  try {
    const jurusan = await JurusanService.findAll();
    res.json(jurusan);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET JURUSAN BY ID
export const getJurusanById = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    const jurusan = await JurusanService.findById(id!);
    if (!jurusan) return res.status(404).json({ message: "Jurusan tidak ditemukan" });

    res.json(jurusan);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE JURUSAN
export const updateJurusan = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    const { nama_jurusan, deskripsi } = req.body;
    const jurusan = await JurusanService.update(id!, { nama_jurusan, deskripsi });

    res.json(jurusan);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE JURUSAN
export const deleteJurusan = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id!);
    await JurusanService.delete(id!);
    res.json({ message: "Jurusan berhasil dihapus" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
