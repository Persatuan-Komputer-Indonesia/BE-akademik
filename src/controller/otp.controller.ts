import { Request, Response } from "express";
import { OTPService } from "../services/otp.service";
import { UserService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";

export class OTPController {
  static request = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email wajib diisi", 400);
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new AppError("User tidak ditemukan", 404);
    }

    await OTPService.send(user.id, user.email, user.username);

    res.json({ message: "OTP berhasil dikirim ke email" });
  });

  static verify = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new AppError("Email dan OTP wajib diisi", 400);
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new AppError("User tidak ditemukan", 404);
    }

    await OTPService.verify(user.id, otp);

    res.json({ message: "OTP valid" });
  });
}
