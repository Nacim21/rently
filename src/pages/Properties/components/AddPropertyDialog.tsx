//src\pages\Properties\components\AddPropertyDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { PropertySummary } from "../types";

interface AddPropertyDialogProps {
  open: boolean;
  newProperty: Omit<PropertySummary, "id">;
  isSubmitting: boolean;
  submitError: string | null;
  onOpenChange: (open: boolean) => void;
  onChange: <K extends keyof Omit<PropertySummary, "id">>(
    key: K,
    value: Omit<PropertySummary, "id">[K]
  ) => void;
  onSubmit: () => void;
}

export function AddPropertyDialog({
  open,
  newProperty,
  isSubmitting,
  submitError,
  onOpenChange,
  onChange,
  onSubmit,
}: AddPropertyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-950 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-50">Add Property</DialogTitle>
          <DialogDescription className="text-gray-300">
            Provide the property details to add it to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label className="text-gray-200" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              value={newProperty.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Sunset Apartments"
              className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-200" htmlFor="address">
              Address
            </Label>
            <Input
              id="address"
              value={newProperty.addressLine1}
              onChange={(event) => onChange("addressLine1", event.target.value)}
              placeholder="123 Main St"
              className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-gray-200" htmlFor="city">
                City
              </Label>
              <Input
                id="city"
                value={newProperty.city}
                onChange={(event) => onChange("city", event.target.value)}
                placeholder="Los Angeles"
                className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-200" htmlFor="state">
                State
              </Label>
              <Input
                id="state"
                value={newProperty.state}
                onChange={(event) => onChange("state", event.target.value)}
                placeholder="CA"
                className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-200" htmlFor="country">
              Country
            </Label>
            <Input
              id="country"
              value={newProperty.country}
              onChange={(event) => onChange("country", event.target.value)}
              placeholder="USA"
              className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label className="text-gray-200" htmlFor="totalUnits">
                Total Units
              </Label>
              <Input
                id="totalUnits"
                type="number"
                value={newProperty.totalUnits}
                onChange={(event) =>
                  onChange("totalUnits", Number(event.target.value) || 0)
                }
                min={0}
                className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-200" htmlFor="occupiedUnits">
                Occupied Units
              </Label>
              <Input
                id="occupiedUnits"
                type="number"
                value={newProperty.occupiedUnits}
                onChange={(event) =>
                  onChange("occupiedUnits", Number(event.target.value) || 0)
                }
                min={0}
                max={newProperty.totalUnits}
                className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-200" htmlFor="monthlyRentTotal">
                Monthly Rent Total
              </Label>
              <Input
                id="monthlyRentTotal"
                type="number"
                value={newProperty.monthlyRentTotal}
                onChange={(event) =>
                  onChange("monthlyRentTotal", Number(event.target.value) || 0)
                }
                min={0}
                className="bg-gray-900 text-gray-100 placeholder:text-gray-500 border-gray-800"
              />
            </div>
          </div>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Property"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddPropertyDialog;