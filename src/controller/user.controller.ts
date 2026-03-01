import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const getParam = (param: string | string[]) => Array.isArray(param) ? param[0] : param;

// CREATE User
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// GET All Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.findAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const user = await UserService.findById(id);
    if (!user) return res.status(404).json({ message: "User ga ketemu bre!" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET User by Email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = getParam(req.params.email);
    const user = await UserService.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User ga ketemu bre!" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const user = await UserService.update(id, req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = getParam(req.params.id);
    await UserService.delete(id);
    res.json({ message: "User berhasil dihapus bre!" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
