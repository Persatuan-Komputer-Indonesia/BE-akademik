import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";
import { OTPService } from "../services/otp.service";
import { TempRegisterStore } from "../utils/tempRegister.store";
import { UserRepository } from "../repository/user.repository";

export class RegisterController {
  // STEP 1 → request register + kirim OTP
  static request = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      throw new AppError("Semua field wajib diisi", 400);

    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new AppError("Email sudah terdaftar", 400);

    // simpan sementara (5 menit)
    TempRegisterStore.set(email, {
      username,
      email,
      password,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await OTPService.sendRegisterOTP(email, username);

    res.json({ message: "OTP registrasi dikirim ke email" });
  });

  // STEP 2 → verify OTP + create user
  static verify = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp)
      throw new AppError("Email dan OTP wajib diisi", 400);

    const temp = TempRegisterStore.get(email);
    if (!temp) throw new AppError("Data registrasi expired", 400);

    await OTPService.verifyRegisterOTP(email, otp);

    const hashed = await bcrypt.hash(temp.password, 10);

    const user = await UserRepository.create({
      username: temp.username,
      email: temp.email,
      password: hashed,
      role: "USER",
    });

    TempRegisterStore.delete(email);

    res.json({
      message: "Registrasi berhasil",
      user,
    });
  });
}
