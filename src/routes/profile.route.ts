import { Router } from "express";
import ProfileController from "../controllers/profile.controller";
import { validateCreateProfile } from "../middlewares/profile.middleware";

const router = Router();

router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.getById);
router.post("/", validateCreateProfile, ProfileController.create);
router.put("/:id", ProfileController.update);
router.delete("/:id", ProfileController.delete);


export default router;
