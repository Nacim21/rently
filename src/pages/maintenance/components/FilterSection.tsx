interface FilterSectionProps {
  filterProperty: string
  filterStatus: string
  onPropertyChange: (value: string) => void
  onStatusChange: (value: string) => void
  children: React.ReactNode
}

const FilterSection = ({ 
  filterProperty, 
  filterStatus, 
  onPropertyChange, 
  onStatusChange,
  children
}: FilterSectionProps) => {
  return (
    <div className="requests-section">
      <h2>All Requests</h2>
      <div className="filters">
        <select 
          value={filterProperty} 
          onChange={(e) => onPropertyChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Properties</option>
          <option value="Sunset Apartments">Sunset Apartments</option>
          <option value="Oak Ridge Complex">Oak Ridge Complex</option>
          <option value="Maple Heights">Maple Heights</option>
        </select>
        
        <select 
          value={filterStatus} 
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="urgent">Urgent</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {children}
    </div>
  )
}

export default FilterSection
