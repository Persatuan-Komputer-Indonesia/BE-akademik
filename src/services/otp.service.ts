import * as brevo from "@getbrevo/brevo";
import { OTPRepository } from "../repository/otp.repository";
import { generateOtpEmailTemplate } from "../utils/otp.template";
import { OtpType } from "../generated/prisma";

const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

export class OTPService {
  private static apiInstance = (() => {
    const instance = new brevo.TransactionalEmailsApi();
    instance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    );
    return instance;
  })();

  // =========================
  // REGISTER
  // =========================
  static async sendRegisterOTP(
    email: string,
    username: string,
    password: string
  ) {
    const code = generateOTP();
    const expired_at = new Date(Date.now() + 5 * 60 * 1000);

    // hapus OTP lama
    await OTPRepository.deleteByEmailAndType(
      email,
      OtpType.REGISTER
    );

    await OTPRepository.create({
      email,
      code,
      type: OtpType.REGISTER,
      expired_at,
      payload: {
        username,
        password,
      },
    });

    const html = generateOtpEmailTemplate(
      username,
      code,
      "Project Akademik"
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = "Kode OTP Registrasi";
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = {
      name: "Project Akademik",
      email: "justcall1313@gmail.com",
    };
    sendSmtpEmail.htmlContent = html;
    

    await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("BREVO RESPONSE:", response);
    console.log(process.env.BREVO_API_KEY)
  }

  static async verifyRegisterOTP(
    email: string,
    inputCode: string
  ) {
    const record = await OTPRepository.findValid(
      email,
      inputCode,
      OtpType.REGISTER
    );

    if (!record) throw new Error("OTP tidak valid");

    if (record.expired_at < new Date())
      throw new Error("OTP kadaluarsa");

    const payload = record.payload as {
      username: string;
      password: string;
    };

    await OTPRepository.deleteById(record.id);

    return payload;
  }
}