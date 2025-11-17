export interface WorkOrder {
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

export const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    title: 'Water heater malfunction',
    tenant: 'Sarah Johnson',
    unit: 'Unit 304',
    property: 'Sunset Apartments',
    submittedDate: '2024-11-26',
    assignedTo: 'Mike Roberts',
    status: 'in-progress',
    priority: 'Urgent',
    category: 'HVAC'
  },
  {
    id: '2',
    title: 'Kitchen faucet leaking',
    tenant: 'Michael Chen',
    unit: 'Unit 204',
    property: 'Sunset Apartments',
    submittedDate: '2024-11-25',
    assignedTo: 'Alex Martinez',
    status: 'in-progress',
    priority: 'Medium',
    category: 'Plumbing'
  },
  {
    id: '3',
    title: 'Broken AC unit',
    tenant: 'Emily Davis',
    unit: 'Unit 105',
    property: 'Oak Ridge Complex',
    submittedDate: '2024-11-24',
    status: 'pending',
    priority: 'Urgent',
    category: 'HVAC'
  },
  {
    id: '4',
    title: 'Leaking pipe',
    tenant: 'John Smith',
    unit: 'Unit 201',
    property: 'Maple Heights',
    submittedDate: '2024-11-23',
    status: 'urgent',
    priority: 'Urgent',
    category: 'Plumbing'
  }
]
