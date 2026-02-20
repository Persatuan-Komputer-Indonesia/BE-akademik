import * as brevo from "@getbrevo/brevo";
import { OTPRepository } from "../repository/otp.repository";
import { generateOtpEmailTemplate } from "../utils/otp.template";
import  prisma  from "../prisma";

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

  static async send(userId: string, email: string, username: string) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

    await OTPRepository.create(userId, otp, expiresAt);

    const html = generateOtpEmailTemplate(
      username,
      otp,
      "Project Akademik"
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Kode OTP Login";
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = {
      name: "Project Akademik",
      email: "no-reply@project.com", // harus verified di Brevo
    };
    sendSmtpEmail.htmlContent = html;

    await this.apiInstance.sendTransacEmail(sendSmtpEmail);
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
static async sendRegisterOTP(email: string, username: string) {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // simpan OTP TANPA userId dulu
  await prisma.oTP.create({
    data: {
      otp,
      expiresAt,
      userId: "TEMP_REGISTER", // dummy
    },
  });

  const html = generateOtpEmailTemplate(username, otp, "Project Akademik");

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Kode OTP Registrasi";
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = {
    name: "Project Akademik",
    email: "no-reply@project.com",
  };
  sendSmtpEmail.htmlContent = html;

  await this.apiInstance.sendTransacEmail(sendSmtpEmail);
}

static async verifyRegisterOTP(email: string, inputOtp: string) {
  const record = await prisma.oTP.findFirst({
    where: {
      otp: inputOtp,
      userId: "TEMP_REGISTER",
    },
  });

  if (!record) throw new Error("OTP tidak valid");
  if (record.expiresAt < new Date())
    throw new Error("OTP kadaluarsa");

  await prisma.oTP.delete({ where: { id: record.id } });
  return true;
}


}

