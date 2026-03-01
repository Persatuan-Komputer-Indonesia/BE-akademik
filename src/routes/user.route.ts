import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  loginUser
} from "../controller/user.controller";

const router = express.Router();

// CREATE
router.post("/", createUser);

// LOGIN
router.post("/login", loginUser);

// GET ALL
router.get("/", getAllUsers);

// GET by Email (HARUS DI ATAS)
router.get("/email/:email", getUserByEmail);

// GET by ID (PALING BAWAH)
router.get("/:id", getUserById);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

export default router;
