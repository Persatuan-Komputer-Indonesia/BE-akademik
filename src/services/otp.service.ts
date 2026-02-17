import nodemailer from "nodemailer";
import { OTPRepository } from "../repository/otp.repository";
import { generateOtpEmailTemplate } from "../utils/otp.template";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

export class OTPService {
  static async send(userId: string, email: string, username: string) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

    await OTPRepository.create(userId, otp, expiresAt);

    const html = generateOtpEmailTemplate(
      username,
      otp,
      "Project Akademik"
    );

    await transporter.sendMail({
      from: '"Project Akademik" <no-reply@project.com>',
      to: email,
      subject: "Kode OTP Login",
      html,
    });
  }

  static async verify(userId: string, inputOtp: string) {
    const record = await OTPRepository.findValidOTP(userId, inputOtp);

    if (!record) {
      throw new Error("OTP tidak valid");
    }

    if (record.expiresAt < new Date()) {
      throw new Error("OTP sudah kadaluarsa");
    }

    await OTPRepository.deleteById(record.id);
    return true;
  }
}
