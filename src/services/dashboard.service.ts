import { DashboardRepository } from "../repository/dashboard.repository";

export const DashboardService = {
  async getStats() {
    const [
      totalJurusan,
      totalLesson,
      totalUser,
      totalAdmin,
    ] = await Promise.all([
      DashboardRepository.countJurusan(),
      DashboardRepository.countLesson(),
      DashboardRepository.countUser(),
      DashboardRepository.countAdmin(),
    ]);

    return {
      totalJurusan,
      totalLesson,
      totalUser,
      totalAdmin,
    };
  },
};