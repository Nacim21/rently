interface WorkOrder {
  id: string
  title: string
  tenant: string
  unit: string
  property: string
  submittedDate: string
  assignedTo?: string
  status: 'urgent' | 'pending' | 'in-progress' | 'completed'
  priority: 'Urgent' | 'Medium' | 'Low'
  category: string
}

interface WorkOrderRowProps {
  order: WorkOrder
}

const WorkOrderRow = ({ order }: WorkOrderRowProps) => {
  const getStatusColor = (status: WorkOrder['status']) => {
    switch (status) {
      case 'urgent':
        return 'status-urgent'
      case 'pending':
        return 'status-pending'
      case 'in-progress':
        return 'status-in-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  const getPriorityColor = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'Urgent':
        return 'priority-urgent'
      case 'Medium':
        return 'priority-medium'
      case 'Low':
        return 'priority-low'
      default:
        return ''
    }
  }

  return (
    <div className="work-order-row">
      <div className="order-badges">
        <span className={`status-badge ${getStatusColor(order.status)}`}>
          {order.status === 'in-progress' ? 'In Progress' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
        <span className={`priority-badge ${getPriorityColor(order.priority)}`}>
          {order.priority}
        </span>
        <span className="category-badge">
          {order.category}
        </span>
      </div>
      
      <div className="order-content">
        <h3 className="order-title">{order.title}</h3>
        <div className="order-details">
          <span>{order.unit}, {order.tenant} • {order.property}</span>
        </div>
        <div className="order-meta">
          <span>Submitted: {new Date(order.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          {order.assignedTo && <span> • Assigned to: {order.assignedTo}</span>}
        </div>
      </div>

      <button className="view-btn">View</button>
    </div>
  )
}

export default WorkOrderRow
