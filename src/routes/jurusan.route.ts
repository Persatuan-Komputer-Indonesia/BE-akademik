import { Router } from "express";
import {
    createJurusan,
    getAllJurusan,
    getJurusanById,
    updateJurusan,
    deleteJurusan,
    restoreJurusan
} from "../controller/jurusan.controller"

const router = Router();

router.post("/", createJurusan);              // create jurusan
router.get("/", getAllJurusan);               // get all jurusan
router.get("/:id", getJurusanById);           // get jurusan by ID
router.put("/:id", updateJurusan);            // update jurusan
router.put("/restore/:id", restoreJurusan);   // restore jurusan yang di soft delete
router.delete("/:id", deleteJurusan);         // soft delete jurusan 

export default router;