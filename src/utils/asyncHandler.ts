import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wrapper untuk menangkap error async tanpa try-catch manual
 * Semua error otomatis diteruskan ke global errorHandler
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
