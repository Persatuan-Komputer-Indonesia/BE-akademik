import { Router } from "express";
import { getDashboardStats } from "../controller/dashboard.controller";

const router = Router();

router.get("/", getDashboardStats);

export default router;