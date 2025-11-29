// src/pages/Properties/components/PropertyCard.tsx

import { MapPin, Users, DollarSign, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import type { PropertySummary } from "../types";

export type PropertyCardProps = {
  property: PropertySummary;
  isSelected?: boolean;
  onSelect?: () => void;
};

function getFullAddress(p: PropertySummary) {
  return `${p.addressLine1}, ${p.city}, ${p.state}`;
}

function getOccupancyPercent(p: PropertySummary) {
  if (!p.totalUnits) return 0;
  return Math.round((p.occupiedUnits / p.totalUnits) * 100);
}

export function PropertyCard({
  property,
  isSelected,
  onSelect,
}: PropertyCardProps) {
  const percent = getOccupancyPercent(property);

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer overflow-hidden shadow-sm transition hover:shadow-md",
        isSelected && "border-primary ring-2 ring-primary/20"
      )}
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="space-y-4 pt-4">
        {/* Name + address */}
        <div>
          <h3 className="text-lg font-semibold leading-tight">
            {property.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{getFullAddress(property)}</span>
          </div>
        </div>

        {/* Occupancy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Occupancy</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} className="h-2" />
        </div>

        {/* Units + monthly rent */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {property.occupiedUnits}/{property.totalUnits} units
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium text-slate-900">
            <DollarSign className="h-4 w-4" />
            <span>{property.monthlyRentTotal.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full justify-center gap-2"
          onClick={(event) => {
            event.stopPropagation();
            onSelect?.();
          }}
        >
          <Eye className="h-4 w-4" />
          View Units
        </Button>
      </CardFooter>
    </Card>
  );
}
