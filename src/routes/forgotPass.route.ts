import { Router } from "express";
import { ForgotPasswordController } from "../controller/auth.forgot.controller";

const router = Router();

router.post("/forgot-password/request", ForgotPasswordController.request);
router.post("/forgot-password/verify", ForgotPasswordController.verify);
router.post("/forgot-password/reset", ForgotPasswordController.reset);

export default router;