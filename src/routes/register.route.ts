import { Router } from "express";
import { RegisterController } from "../controller/auth.register.controller";

const router = Router();

router.post("/request", RegisterController.request);
router.post("/verify", RegisterController.verify);

export default router;
