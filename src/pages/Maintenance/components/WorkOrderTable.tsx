// src/pages/Maintenance/components/WorkOrderTable.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

import type { WorkOrder, WorkOrderStatus, WorkOrderPriority } from "../MaintenancePage";

type WorkOrderTableProps = {
  orders: WorkOrder[];
  propertyFilter: string;
  statusFilter: string;
  onPropertyFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

export function WorkOrderTable({
  orders,
  propertyFilter,
  statusFilter,
  onPropertyFilterChange,
  onStatusFilterChange,
}: WorkOrderTableProps) {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-base">Work Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage and track all maintenance requests.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {/* Property filter */}
          <Select value={propertyFilter} onValueChange={onPropertyFilterChange}>
            <SelectTrigger className="h-8 w-[160px] rounded-lg border-slate-200 bg-slate-50 text-xs">
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="Sunset Apartments">Sunset Apartments</SelectItem>
              <SelectItem value="Pine Plaza">Pine Plaza</SelectItem>
              <SelectItem value="Oak Residences">Oak Residences</SelectItem>
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="h-8 w-[140px] rounded-lg border-slate-200 bg-slate-50 text-xs">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/70">
              <TableRow>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Work Order
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tenant
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Property & Unit
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Priority
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Submitted
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b last:border-b-0 hover:bg-slate-50/70"
                >
                  {/* Work Order ID and Title */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800">
                        {order.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.title}
                      </span>
                    </div>
                  </TableCell>

                  {/* Tenant */}
                  <TableCell className="text-sm text-slate-700">
                    {order.tenant}
                  </TableCell>

                  {/* Property and Unit */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-800">
                        {order.property}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.unit}
                      </span>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="text-sm text-slate-700">
                    {order.category}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>

                  {/* Priority Badge */}
                  <TableCell>
                    <PriorityBadge priority={order.priority} />
                  </TableCell>

                  {/* Submitted Date */}
                  <TableCell className="text-sm text-slate-700">
                    {order.submittedDate}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// Status badge component
function StatusBadge({ status }: { status: WorkOrderStatus }) {
  const style =
    status === "urgent"
      ? "bg-red-50 text-red-700 border-red-100"
      : status === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : status === "in-progress"
      ? "bg-blue-50 text-blue-700 border-blue-100"
      : "bg-emerald-50 text-emerald-700 border-emerald-100";

  const label =
    status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-0.5 text-xs font-medium border ${style}`}
    >
      {label}
    </Badge>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: WorkOrderPriority }) {
  const style =
    priority === "Urgent"
      ? "bg-red-50 text-red-700 border-red-100"
      : priority === "Medium"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : "bg-slate-50 text-slate-700 border-slate-100";

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-0.5 text-xs font-medium border ${style}`}
    >
      {priority}
    </Badge>
  );
}
