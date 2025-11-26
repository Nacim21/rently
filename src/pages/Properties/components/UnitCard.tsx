// src/pages/Properties/components/UnitCard.tsx

import { Home, Eye, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { UnitSummary } from "../types";

export type UnitCardProps = {
  unit: UnitSummary;
};

function formatLeaseEnd(date?: string) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UnitCard({ unit }: UnitCardProps) {
  const isOccupied = unit.status === "occupied";

  return (
    <Card className="h-full shadow-sm">
      <CardContent className="flex h-full flex-col justify-between gap-4 pt-4">
        <div className="space-y-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <div className="font-medium">{unit.unitNumber}</div>
            </div>
            <Badge
              className={cn(
                "text-xs",
                isOccupied
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              )}
            >
              {isOccupied ? "Occupied" : "Vacant"}
            </Badge>
          </div>

          {/* Monthly rent */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly Rent</span>
            <span className="font-semibold">
              ${unit.monthlyRent.toLocaleString()}
            </span>
          </div>

          {/* Tenant + lease */}
          <div className="grid gap-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Tenant</span>
              <span className="font-medium text-slate-900">
                {unit.tenantName ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Lease Ends</span>
              <span className="font-medium text-slate-900">
                {isOccupied ? formatLeaseEnd(unit.leaseEndDate) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 justify-center gap-1"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>

          {isOccupied ? (
            <Button size="sm" className="flex-1 justify-center gap-1">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          ) : (
            <Button size="sm" className="flex-1 justify-center">
              Assign
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
