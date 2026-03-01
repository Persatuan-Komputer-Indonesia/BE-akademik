import prisma from "../prisma";
import { OtpType } from "../generated/prisma";

export class OTPRepository {
  static create(data: {
    email: string;
    code: string;
    type: OtpType;
    payload?: any;
    expired_at: Date;
    user_id?: string;
  }) {
    return prisma.otp.create({ data });
  }

  static findValid(email: string, code: string, type: OtpType) {
    return prisma.otp.findFirst({
      where: {
        email,
        code,
        type,
      },
    });
  }

  static deleteById(id: number) {
    return prisma.otp.delete({
      where: { id },
    });
  }

  static deleteByEmailAndType(email: string, type: OtpType) {
    return prisma.otp.deleteMany({
      where: { email, type },
    });
  }
}