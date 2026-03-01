import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";

const getParam = (param: string | string[]) => Array.isArray(param) ? param[0] : param;

// CREATE Profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const profile = await ProfileService.create(req.body);
    res.status(201).json(profile);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// GET All Profiles
export const getAllProfiles = async (_req: Request, res: Response) => {
  try {
    const profiles = await ProfileService.findAll();
    res.json(profiles);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET Profile by ID
export const getProfileById = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const profile = await ProfileService.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile ga ketemu bre!" });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET Profile by User ID
export const getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const user_id = getParam(req.params.user_id);
    const profile = await ProfileService.findByUserId(user_id);
    if (!profile) return res.status(404).json({ message: "Profile ga ketemu bre!" });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE Profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const profile = await ProfileService.update(id, req.body);
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE Profile
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    await ProfileService.delete(id);
    res.json({ message: "Profile berhasil dihapus bre!" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
