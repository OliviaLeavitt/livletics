export type WorkoutFocus = 'Lower Body' | 'Upper Body' | 'Power' | 'Recovery'

export type RecoveryMetric = {
  id: string
  label: string
  value: number
  status: 'Ready' | 'Recovering' | 'Watch'
}

export type TrainingInsight = {
  id: string
  title: string
  summary: string
  intensity: 'Low' | 'Moderate' | 'High'
}

export type DashboardData = {
  readinessScore: number
  todaysFocus: WorkoutFocus
  heartRate: number
  recoveryMetrics: RecoveryMetric[]
  insights: TrainingInsight[]
}
