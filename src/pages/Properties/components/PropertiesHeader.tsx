import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PropertiesHeaderProps {
  onAddProperty: () => void;
}

export function PropertiesHeader({ onAddProperty }: PropertiesHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
        <p className="text-sm text-muted-foreground">
          Manage your rental properties and units.
        </p>
      </div>

      <Button size="sm" className="gap-2" onClick={onAddProperty}>
        <Plus className="h-4 w-4" />
        Add Property
      </Button>
    </div>
  );
}

export default PropertiesHeader;