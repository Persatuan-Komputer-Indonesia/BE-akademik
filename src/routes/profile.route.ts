import { Router } from "express";
import ProfileController from "../controllers/profile.controller";
import { validateCreateProfile } from "../middlewares/profile.middleware";
import { uploadProfile } from "../middlewares/uploadProfile.middleware";

const router = Router();

router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.getById);

router.post(
  "/",
  uploadProfile.single("profile"),
  validateCreateProfile,
  ProfileController.create
);

router.put(
  "/:id",
  uploadProfile.single("profile"),
  ProfileController.update
);

router.delete("/:id", ProfileController.delete);

export default router;
