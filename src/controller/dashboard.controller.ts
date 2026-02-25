import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await DashboardService.getStats();
    res.json(stats);
  }
);