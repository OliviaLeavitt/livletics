import type { RecoveryMetric, TrainingInsight } from '../../domain/models/dashboard'

type RecoveryCardProps = {
  metric: RecoveryMetric
}

type InsightCardProps = {
  insight: TrainingInsight
}

export function RecoveryCard({ metric }: RecoveryCardProps) {
  return (
    <div className="recovery-card">
      <span className="metric-label">{metric.label}</span>
      <strong>{metric.value}%</strong>
      <small>{metric.status}</small>
    </div>
  )
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className="insight-card">
      <p className="card-label">{insight.title}</p>
      <strong>{insight.summary}</strong>
      <span>{insight.intensity}</span>
    </article>
  )
}
