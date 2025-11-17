import { useState } from 'react'
import './Maintenance.css'
import StatsCard from './components/StatsCard'
import FilterSection from './components/FilterSection'
import WorkOrderRow from './components/WorkOrderRow'
import { mockWorkOrders, type WorkOrder } from './mockData'

const Maintenance = () => {
  const [workOrders] = useState<WorkOrder[]>(mockWorkOrders)
  const [filterProperty, setFilterProperty] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredWorkOrders = workOrders.filter(order => {
    const propertyMatch = filterProperty === 'all' || order.property === filterProperty
    const statusMatch = filterStatus === 'all' || order.status === filterStatus
    return propertyMatch && statusMatch
  })

  const urgentCount = workOrders.filter(o => o.status === 'urgent').length
  const pendingCount = workOrders.filter(o => o.status === 'pending').length
  const inProgressCount = workOrders.filter(o => o.status === 'in-progress').length
  const completedCount = workOrders.filter(o => o.status === 'completed').length

  return (
    <div className="maintenance-container">
      <header className="maintenance-header">
        <h1>Maintenance Management</h1>
        <p>Track and manage maintenance requests</p>
      </header>

      <div className="stats-cards">
        <StatsCard 
          type="urgent"
          count={urgentCount}
          icon="⚠️"
          label="Urgent"
          description="Requires immediate attention"
        />
        <StatsCard 
          type="pending"
          count={pendingCount}
          icon="⏰"
          label="Pending"
          description="Awaiting assignment"
        />
        <StatsCard 
          type="in-progress"
          count={inProgressCount}
          icon="🔧"
          label="In Progress"
          description="Being worked on"
        />
        <StatsCard 
          type="completed"
          count={completedCount}
          icon="✓"
          label="Completed (Nov)"
          description="↑ 15% vs last month"
        />
      </div>

      <FilterSection
        filterProperty={filterProperty}
        filterStatus={filterStatus}
        onPropertyChange={setFilterProperty}
        onStatusChange={setFilterStatus}
      >
        <div className="work-orders-list">
          {filteredWorkOrders.length === 0 ? (
            <div className="no-orders">
              <p>No work orders found</p>
            </div>
          ) : (
            filteredWorkOrders.map(order => (
              <WorkOrderRow key={order.id} order={order} />
            ))
          )}
        </div>
      </FilterSection>
    </div>
  )
}

export default Maintenance
