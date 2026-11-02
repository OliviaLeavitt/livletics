import type { DashboardData } from '../../domain/models/dashboard'
import type { DashboardRepository } from '../../domain/ports/dashboardRepository'

export const getDashboardData = async (
  repository: DashboardRepository,
): Promise<DashboardData> => repository.getDashboardData()
