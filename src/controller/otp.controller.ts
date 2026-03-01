import { Request, Response } from "express";
import { OTPService } from "../services/otp.service";
import { UserService } from "../services/user.service";

export class OTPController {
  static async request(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email wajib diisi" });
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await OTPService.send(user.id, user.email, user.username);

    res.json({ message: "OTP berhasil dikirim ke email" });
  }

  static async verify(req: Request, res: Response) {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email dan OTP wajib diisi" });
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await OTPService.verify(user.id, otp);

    res.json({ message: "OTP valid" });
  }
}
