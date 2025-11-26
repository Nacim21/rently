 // src/pages/Properties/PropertiesPage.tsx
import { Navigate } from "react-router-dom";
import { MapPin, Users, DollarSign, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

// ---- Domain types that can later line up with your backend models ----

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

// mock data – replace with API call later
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

// helpers (purely presentational right now)
function fullAddress(p: PropertySummary) {
  return `${p.addressLine1}, ${p.city}, ${p.state}`;
}

function occupancyPercent(p: PropertySummary) {
  if (!p.totalUnits) return 0;
  return Math.round((p.occupiedUnits / p.totalUnits) * 100);
}

type PropertyCardProps = {
  property: PropertySummary;
};

function PropertyCard({ property }: PropertyCardProps) {
  const percent = occupancyPercent(property);

  return (
    <Card className="overflow-hidden shadow-sm">
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
        <Button variant="outline" className="w-full justify-center">
          View Units
        </Button>
      </CardFooter>
    </Card>
  );
}

const LANDLORD_ROLE: UserRole = "Landlord";

// landlord-only page
export default function PropertiesPage() {
  const { currentUser } = useAuth();

  if (currentUser && currentUser.role !== LANDLORD_ROLE) {
    // if somehow a tenant hits this route, kick them back
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
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
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
