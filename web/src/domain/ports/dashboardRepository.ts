import type { DashboardData } from '../models/dashboard'

export interface DashboardRepository {
  getDashboardData(): Promise<DashboardData>
}
