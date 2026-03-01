import { Router } from "express"
import {
    createProfile,
    getAllProfiles,
    getProfileById,
    getProfileByUserId,
    updateProfile,
    deleteProfile,
} from "../controller/profile.controller"

const router = Router();

router.post("/", createProfile)
router.get("/", getAllProfiles)
router.get("/:id", getProfileById)
router.get("/user/:userId", getProfileByUserId)
router.put("/:id", updateProfile)
router.delete("/:id", deleteProfile)

export default router;
