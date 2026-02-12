import { Request, Response } from "express";
import ProfileService from "../services/profile.service";

const service = new ProfileService();

export default class ProfileController {

  static async getAll(_req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await service.getById(req.params.id as string);
      res.json(data);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = await service.create(req.body);
      res.status(201).json(data);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await service.update(req.params.id as string, req.body);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id as string);
      res.json({ message: "Profile berhasil dihapus" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
