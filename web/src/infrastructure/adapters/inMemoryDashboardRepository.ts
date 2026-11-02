import type { DashboardData } from '../../domain/models/dashboard'
import type { DashboardRepository } from '../../domain/ports/dashboardRepository'

const dashboardData: DashboardData = {
  readinessScore: 87,
  todaysFocus: 'Lower Body',
  heartRate: 148,
  recoveryMetrics: [
    { id: 'sleep', label: 'Sleep', value: 92, status: 'Ready' },
    { id: 'recovery', label: 'Recovery', value: 86, status: 'Ready' },
    { id: 'training-load', label: 'Load', value: 78, status: 'Recovering' },
    { id: 'performance', label: 'Performance', value: 94, status: 'Ready' },
  ],
  insights: [
    {
      id: 'insight-01',
      title: 'Training load',
      summary: 'Optimal range over the last 7 days.',
      intensity: 'Moderate',
    },
    {
      id: 'insight-02',
      title: 'Performance',
      summary: '+12% this month with stronger push output.',
      intensity: 'High',
    },
    {
      id: 'insight-03',
      title: 'Recovery',
      summary: 'Up 7% week over week with solid sleep.',
      intensity: 'Low',
    },
  ],
}

export const inMemoryDashboardRepository: DashboardRepository = {
  async getDashboardData() {
    return dashboardData
  },
}
