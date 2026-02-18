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
  const id = getParam(req.params.id);
  const user = await UserService.findById(id);
  if (!user) throw new AppError("User tidak ditemukan", 404);

  res.json(user);
});

export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const email = getParam(req.params.email);
  const user = await UserService.findByEmail(email);
  if (!user) throw new AppError("User tidak ditemukan", 404);

  res.json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  const user = await UserService.update(id, req.body);
  res.json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);
  await UserService.delete(id);
  res.json({ message: "User berhasil dihapus" });
});
