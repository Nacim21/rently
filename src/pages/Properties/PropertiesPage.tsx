// src/pages/Properties/PropertiesPage.tsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  MapPin,
  Users,
  DollarSign,
  Plus,
  Home,
  Eye,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Types that can later align with your backend models
// ----------------------------------------------------------------------

export type PropertySummary = {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  imageUrl: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRentTotal: number; // aggregated rent for the property
};

export type UnitStatus = "occupied" | "vacant";

export type UnitSummary = {
  id: string;
  propertyId: string;
  unitNumber: string;
  status: UnitStatus;
  monthlyRent: number;
  tenantName?: string; // null/undefined when vacant
  // ISO 8601 date from backend later (e.g., "2025-06-30")
  leaseEndDate?: string;
};

// ----------------------------------------------------------------------
// Mock data (replace with API calls later)
// ----------------------------------------------------------------------

const MOCK_PROPERTIES: PropertySummary[] = [
  {
    id: "sunset-apartments",
    name: "Sunset Apartments",
    addressLine1: "123 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
    totalUnits: 12,
    occupiedUnits: 11,
    monthlyRentTotal: 22200,
  },
  {
    id: "pine-plaza",
    name: "Pine Plaza",
    addressLine1: "456 Pine Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    imageUrl:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1600",
    totalUnits: 8,
    occupiedUnits: 8,
    monthlyRentTotal: 14400,
  },
  {
    id: "oak-residences",
    name: "Oak Residences",
    addressLine1: "789 Oak Avenue",
    city: "San Diego",
    state: "CA",
    country: "USA",
    imageUrl:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1600",
    totalUnits: 4,
    occupiedUnits: 3,
    monthlyRentTotal: 6200,
  },
];

const MOCK_UNITS: UnitSummary[] = [
  // Pine Plaza units
  {
    id: "pine-101",
    propertyId: "pine-plaza",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 1850,
    tenantName: "Sarah Johnson",
    leaseEndDate: "2024-12-31",
  },
  {
    id: "pine-102",
    propertyId: "pine-plaza",
    unitNumber: "Unit 102",
    status: "occupied",
    monthlyRent: 1800,
    tenantName: "Michael Chen",
    leaseEndDate: "2025-03-15",
  },
  {
    id: "pine-103",
    propertyId: "pine-plaza",
    unitNumber: "Unit 103",
    status: "occupied",
    monthlyRent: 1900,
    tenantName: "Emily Rodriguez",
    leaseEndDate: "2025-06-30",
  },
  {
    id: "pine-104",
    propertyId: "pine-plaza",
    unitNumber: "Unit 104",
    status: "vacant",
    monthlyRent: 1850,
  },
  {
    id: "pine-201",
    propertyId: "pine-plaza",
    unitNumber: "Unit 201",
    status: "occupied",
    monthlyRent: 1950,
    tenantName: "David Kim",
    leaseEndDate: "2025-10-15",
  },
  {
    id: "pine-202",
    propertyId: "pine-plaza",
    unitNumber: "Unit 202",
    status: "occupied",
    monthlyRent: 1900,
    tenantName: "Lisa Anderson",
    leaseEndDate: "2025-08-31",
  },

  // Some example units for the other properties
  {
    id: "sunset-101",
    propertyId: "sunset-apartments",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 2100,
    tenantName: "James Miller",
    leaseEndDate: "2025-04-01",
  },
  {
    id: "oak-101",
    propertyId: "oak-residences",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 1700,
    tenantName: "Ana Lopez",
    leaseEndDate: "2025-02-20",
  },
];

function fullAddress(p: PropertySummary) {
  return `${p.addressLine1}, ${p.city}, ${p.state}`;
}

function occupancyPercent(p: PropertySummary) {
  if (!p.totalUnits) return 0;
  return Math.round((p.occupiedUnits / p.totalUnits) * 100);
}

function formatLeaseEnd(date?: string) {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ----------------------------------------------------------------------
// Presentational pieces
// ----------------------------------------------------------------------

type PropertyCardProps = {
  property: PropertySummary;
  isSelected?: boolean;
  onSelect?: () => void;
};

function PropertyCard({ property, isSelected, onSelect }: PropertyCardProps) {
  const percent = occupancyPercent(property);

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "overflow-hidden cursor-pointer shadow-sm transition hover:shadow-md",
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
            <span>{fullAddress(property)}</span>
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
          onClick={(e) => {
            e.stopPropagation();
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

type UnitCardProps = {
  unit: UnitSummary;
};

function UnitCard({ unit }: UnitCardProps) {
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

// ----------------------------------------------------------------------
// Page (landlord-only)
// ----------------------------------------------------------------------

const LANDLORD_ROLE: UserRole = "Landlord";

export default function PropertiesPage() {
  const { currentUser } = useAuth();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    MOCK_PROPERTIES[1]?.id ?? null // default to Pine Plaza for now
  );

  if (currentUser && currentUser.role !== LANDLORD_ROLE) {
    // Tenant somehow hits this route → send back to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  const selectedProperty = MOCK_PROPERTIES.find(
    (p) => p.id === selectedPropertyId
  );
  const unitsForSelected = selectedProperty
    ? MOCK_UNITS.filter((u) => u.propertyId === selectedProperty.id)
    : [];

  return (
    <div className="space-y-8">
      {/* Header + primary action */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Properties
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your rental properties and units.
          </p>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Properties grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_PROPERTIES.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={property.id === selectedPropertyId}
            onSelect={() => setSelectedPropertyId(property.id)}
          />
        ))}
      </div>

      {/* Units for selected property */}
      {selectedProperty && (
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>{selectedProperty.name} - Units</CardTitle>
              <CardDescription>
                View occupancy, rent, and lease details for each unit.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Unit
            </Button>
          </CardHeader>

          <CardContent>
            {unitsForSelected.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No units found for this property yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {unitsForSelected.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
