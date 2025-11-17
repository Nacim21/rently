interface StatsCardProps {
  type: 'urgent' | 'pending' | 'in-progress' | 'completed'
  count: number
  icon: string
  label: string
  description: string
}

const StatsCard = ({ type, count, icon, label, description }: StatsCardProps) => {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-number">{count}</div>
        <div className="stat-description">{description}</div>
      </div>
    </div>
  )
}

export default StatsCard
