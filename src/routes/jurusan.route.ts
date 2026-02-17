import { Router } from "express";
import {
    createJurusan,
    getAllJurusan,
    getJurusanById,
    updateJurusan,
    deleteJurusan
} from "../controller/jurusan.controller"

const router = Router();

router.post("/", createJurusan)
router.get("/", getAllJurusan)
router.get("/:id", getJurusanById)
router.put("/:id", updateJurusan)
router.delete("/:id", deleteJurusan)

export default router;