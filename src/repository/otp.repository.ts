import prisma from "../prisma";

export class OTPRepository {
  static create(userId: string, otp: string, expiresAt: Date) {
    return prisma.oTP.create({
      data: {
        userId,
        otp,
        expiresAt,
      },
    });
  }

  static findValidOTP(userId: string, otp: string) {
    return prisma.oTP.findFirst({
      where: {
        userId,
        otp,
      },
    });
  }

  static deleteById(id: string) {
    return prisma.oTP.delete({
      where: { id },
    });
  }
}
