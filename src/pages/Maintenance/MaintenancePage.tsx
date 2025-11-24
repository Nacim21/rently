// src/pages/Maintenance/MaintenancePage.tsx
import { useState } from "react";

import { StatsSection } from "./components/StatsSection";
import { WorkOrderTable } from "./components/WorkOrderTable";

export type WorkOrderStatus = "urgent" | "pending" | "in-progress" | "completed";
export type WorkOrderPriority = "Urgent" | "Medium" | "Low";

export type WorkOrder = {
  id: string;
  title: string;
  tenant: string;
  unit: string;
  property: string;
  submittedDate: string;
  assignedTo?: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  category: string;
};

// Mock data for development
const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: "WO-001",
    title: "Leaking Kitchen Faucet",
    tenant: "John Smith",
    unit: "Unit 204",
    property: "Sunset Apartments",
    submittedDate: "Nov 15, 2024",
    assignedTo: "Mike Johnson",
    status: "in-progress",
    priority: "Medium",
    category: "Plumbing",
  },
  {
    id: "WO-002",
    title: "HVAC System Not Working",
    tenant: "Sarah Williams",
    unit: "Unit 102",
    property: "Pine Plaza",
    submittedDate: "Nov 18, 2024",
    status: "urgent",
    priority: "Urgent",
    category: "HVAC",
  },
  {
    id: "WO-003",
    title: "Broken Window Seal",
    tenant: "Michael Brown",
    unit: "Unit 305",
    property: "Oak Residences",
    submittedDate: "Nov 10, 2024",
    assignedTo: "Tom Davis",
    status: "completed",
    priority: "Low",
    category: "Windows",
  },
  {
    id: "WO-004",
    title: "Electrical Outlet Not Working",
    tenant: "Emily Davis",
    unit: "Unit 201",
    property: "Sunset Apartments",
    submittedDate: "Nov 17, 2024",
    status: "pending",
    priority: "Medium",
    category: "Electrical",
  },
];

export default function MaintenancePage() {
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter work orders based on selected filters
  const filteredOrders = MOCK_WORK_ORDERS.filter((order) => {
    const matchesProperty =
      propertyFilter === "all" || order.property === propertyFilter;
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesProperty && matchesStatus;
  });

  // Calculate stats for the stats cards
  const stats = {
    urgent: MOCK_WORK_ORDERS.filter((order) => order.status === "urgent")
      .length,
    pending: MOCK_WORK_ORDERS.filter((order) => order.status === "pending")
      .length,
    inProgress: MOCK_WORK_ORDERS.filter(
      (order) => order.status === "in-progress"
    ).length,
    completed: MOCK_WORK_ORDERS.filter((order) => order.status === "completed")
      .length,
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Maintenance Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Track and manage work orders across all properties.
        </p>
      </header>

      {/* Stats cards section */}
      <StatsSection stats={stats} />

      {/* Work order table with filters */}
      <WorkOrderTable
        orders={filteredOrders}
        propertyFilter={propertyFilter}
        statusFilter={statusFilter}
        onPropertyFilterChange={setPropertyFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </div>
  );
}
