import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";

const getParam = (param: string | string[]) =>
  Array.isArray(param) ? param[0] : param;

export const createProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await ProfileService.create(req.body);
  res.status(201).json(profile);
});

export const getAllProfiles = asyncHandler(async (_req: Request, res: Response) => {
  const profiles = await ProfileService.findAll();
  res.json(profiles);
});

export const getProfileById = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  const profile = await ProfileService.findById(id);
  if (!profile) throw new AppError("Profile tidak ditemukan", 404);

  res.json(profile);
});

export const getProfileByUserId = asyncHandler(async (req: Request, res: Response) => {
  const user_id = getParam(req.params.user_id);
  const profile = await ProfileService.findByUserId(user_id);
  if (!profile) throw new AppError("Profile tidak ditemukan", 404);

  res.json(profile);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  const profile = await ProfileService.update(id, req.body);
  res.json(profile);
});

export const deleteProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  await ProfileService.delete(id);
  res.json({ message: "Profile berhasil dihapus" });
});
