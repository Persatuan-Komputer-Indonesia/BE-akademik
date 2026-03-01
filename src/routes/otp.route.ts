import { Router } from "express";
import { OTPController } from "../controller/otp.controller";

const router = Router();

router.post("/request", OTPController.request);
router.post("/verify", OTPController.verify);

export default router;
