//src/controller/auth.register.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";
import { OTPService } from "../services/otp.service";
import { UserRepository } from "../repository/user.repository";

export class RegisterController {
  // STEP 1 → request register + kirim OTP
  static request = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new AppError("Semua field wajib diisi", 400);

  const existing = await UserRepository.findByEmail(email);
  if (existing) throw new AppError("Email sudah terdaftar", 400);

  await OTPService.sendRegisterOTP(email, username, password);

  res.json({ message: "OTP registrasi dikirim ke email" });
});

  // STEP 2 → verify OTP + create user
 static verify = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    throw new AppError("Email dan OTP wajib diisi", 400);

  const payload = await OTPService.verifyRegisterOTP(email, otp);

  const hashed = await bcrypt.hash(payload.password, 10);

  const user = await UserRepository.create({
    username: payload.username,
    email,
    password: hashed,
    role: "USER",
  });

  res.json({
    message: "Registrasi berhasil",
    user,
  });
});
}
