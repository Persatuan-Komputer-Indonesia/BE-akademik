import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";
import { OTPService } from "../services/otp.service";

export class ForgotPasswordController {
  static request = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email)
      throw new AppError("Email wajib diisi", 400);

    await OTPService.sendForgotPasswordOTP(email);

    res.json({
      message: "OTP reset password dikirim",
    });
  });

  static verify = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    throw new AppError("Email dan OTP wajib diisi", 400);

  await OTPService.verifyForgotPasswordOTP(email, otp);

  res.json({
    message: "OTP valid",
  });
});
static reset = asyncHandler(async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    throw new AppError("Semua field wajib diisi", 400);

  await OTPService.resetPassword(email, newPassword);

  res.json({
    message: "Password berhasil direset",
  });
});
}