import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";

const getParam = (param: string | string[]) =>
  Array.isArray(param) ? param[0] : param;

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.create(req.body);
  res.status(201).json(user);
});

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserService.findAll();
  res.json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  const user = await UserService.findById(id as any);
  if (!user) throw new AppError("User tidak ditemukan", 404);

  res.json(user);
});

export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const email = getParam(req.params.email as any);
  const user = await UserService.findByEmail(email as any);
  if (!user) throw new AppError("User tidak ditemukan", 404);

  res.json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  const user = await UserService.update(id as any, req.body);
  res.json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id as any);
  await UserService.delete(id as any);
  res.json({ message: "User berhasil dihapus" });
});
