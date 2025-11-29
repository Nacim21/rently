 
import { PropertyCard } from "./PropertyCard";
import type { PropertySummary } from "../types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface PropertiesGridSectionProps {
  properties: PropertySummary[];
  selectedPropertyId: string | null;
  isLoading: boolean;
  loadError: string | null;
  onSelectProperty: (propertyId: string) => void;
  onRetry: () => void;
}

export function PropertiesGridSection({
  properties,
  selectedPropertyId,
  isLoading,
  loadError,
  onSelectProperty,
  onRetry,
}: PropertiesGridSectionProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Loading properties...
        </CardContent>
      </Card>
    );
  }

  if (loadError) {
    return (
      <Card>
        <CardContent className="space-y-3 py-8 text-center">
          <p className="text-sm text-muted-foreground">{loadError}</p>
          <Button size="sm" variant="outline" onClick={onRetry}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No properties found. Try adding your first property.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isSelected={property.id === selectedPropertyId}
          onSelect={() => onSelectProperty(property.id)}
        />
      ))}
    </div>
  );
}

export default PropertiesGridSection;