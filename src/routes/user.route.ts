import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controller/user.controller";

const router = express.Router();

// CREATE
router.post("/", createUser);

// GET ALL
router.get("/", getAllUsers);

// GET by ID
router.get("/:id", getUserById);

// GET by Email
router.get("/email/:email", getUserByEmail);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

export default router;
