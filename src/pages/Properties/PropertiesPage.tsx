// src/pages/Properties/PropertiesPage.tsx

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

import { MOCK_PROPERTIES, MOCK_UNITS } from "./mockData";
import { PropertyCard } from "./components/PropertyCard";
import { UnitCard } from "./components/UnitCard";

const LANDLORD_ROLE: UserRole = "Landlord";

function PropertiesPageInternal() {
  const { currentUser } = useAuth();

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    MOCK_PROPERTIES[1]?.id ?? null // visually default to Pine Plaza
  );

  if (currentUser && currentUser.role !== LANDLORD_ROLE) {
    // Tenant hits this route → send back to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  const selectedProperty = MOCK_PROPERTIES.find(
    (property) => property.id === selectedPropertyId
  );

  const unitsForSelected = selectedProperty
    ? MOCK_UNITS.filter((unit) => unit.propertyId === selectedProperty.id)
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

// Named export (matches guidelines) and default export for router convenience
export function PropertiesPage() {
  return <PropertiesPageInternal />;
}

export default PropertiesPage;
