// src/pages/Properties/PropertiesPage.tsx

import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

import { AddPropertyDialog } from "./components/AddPropertyDialog";
import { PropertiesGridSection } from "./components/PropertiesGridSection";
import { PropertiesHeader } from "./components/PropertiesHeader";
import { UnitsSection } from "./components/UnitsSection";
import type { PropertySummary, UnitSummary } from "./types";

const LANDLORD_ROLE: UserRole = "Landlord";
const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80";

// Remove imageUrl from the property form state (we no longer collect it in the UI)
export type PropertyFormState = Omit<PropertySummary, "id" | "imageUrl">;

type ApiProperty = Partial<PropertySummary> & {
  id: string | number;
  address?: string;
  address_line1?: string;
  image?: string;
  image_url?: string;
  total_units?: number;
  occupied_units?: number;
  monthly_rent_total?: number;
  owner?: string | number;
  owner_id?: string | number;
  units?: UnitSummary[];
};

function PropertiesPageInternal() {
  const { currentUser } = useAuth();

  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [newProperty, setNewProperty] = useState<PropertyFormState>({
    name: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    totalUnits: 0,
    occupiedUnits: 0,
    monthlyRentTotal: 0,
  });

  const apiBase = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setLoadError(null);
      setProperties([]);
      setSelectedPropertyId(null);

      try {
        if (!currentUserId) {
          setLoadError("You must be logged in to view properties.");
          return;
        }

        const url = `${apiBase}/api/properties/`;
        console.log("👉 Fetching properties from:", url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load properties (${response.status})`);
        }

        const data = (await response.json()) as ApiProperty[];
        const normalized = Array.isArray(data)
          ? data
              .filter((property) => {
                const owner = property.owner ?? property.owner_id;
                return owner !== undefined && String(owner) === String(currentUserId);
              })
              .map(normalizeProperty)
          : [];

        setProperties(normalized);

        setSelectedPropertyId(normalized[0]?.id ?? null);
      } catch (error) {
        console.error("Failed to fetch properties", error);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load properties right now."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [apiBase, currentUserId]);

  if (currentUser && currentUser.role !== LANDLORD_ROLE) {
    return <Navigate to="/dashboard" replace />;
  }

  const selectedProperty = useMemo(
    () => properties.find((property) => property.id === selectedPropertyId),
    [properties, selectedPropertyId]
  );

  const handleCreateProperty = async () => {
    if (!currentUser) {
      setSubmitError("You must be logged in to create a property.");
      return;
    }

    const ownerId = currentUser.id;

    if (!ownerId) {
      setSubmitError("Missing user information. Please sign in again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Shape payload to match backend expectation:
      // {
      //   "owner": 3,
      //   "name": "Sunset Villa",
      //   "property_number": "A12",
      //   "address": "1234 Sunset Street, El Paso, TX",
      //   "total_units": 0,
      //   "occupied_units": 0,
      //   "monthly_rent_total": "0.00"
      // }
      const addressParts = [
        newProperty.addressLine1,
        newProperty.city,
        newProperty.state,
        newProperty.country,
      ].filter(Boolean);

      const payload = {
        owner: Number(ownerId),
        name: newProperty.name,
        // property_number is not currently captured in the UI — leave empty or
        // update AddPropertyDialog to include this field if required.
        property_number: "",
        address: addressParts.join(", "),
        total_units: Number(newProperty.totalUnits ?? 0),
        occupied_units: Number(newProperty.occupiedUnits ?? 0),
        // backend expects a string like "0.00"
        monthly_rent_total:
          typeof newProperty.monthlyRentTotal === "number"
            ? newProperty.monthlyRentTotal.toFixed(2)
            : String(newProperty.monthlyRentTotal),
      };

      // Helpful debug log to inspect exactly what's being sent
      console.log("👉 Creating property - POST payload:", payload);

      // Build headers and include Authorization if available on currentUser
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const maybeToken =
        (currentUser as any)?.token ?? (currentUser as any)?.accessToken ?? null;
      if (maybeToken) {
        headers.Authorization = `Bearer ${maybeToken}`;
      }

      const response = await fetch(`${apiBase}/api/properties/create/${ownerId}/`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // try to read body for debugging
        const text = await response.text().catch(() => null);
        console.error(
          "Create property failed:",
          response.status,
          response.statusText,
          "response body:",
          text
        );
        let parsed = null;
        try {
          parsed = text ? JSON.parse(text) : null;
        } catch {}
        const detail = (parsed as { detail?: string })?.detail;
        throw new Error(detail ?? `Unable to create property (status ${response.status}).`);
      }

      const created = normalizeProperty(await response.json());
      setProperties((prev) => [created, ...prev]);
      setSelectedPropertyId(created.id);
      setIsDialogOpen(false);
      setNewProperty({
        name: "",
        addressLine1: "",
        city: "",
        state: "",
        country: "",
        totalUnits: 0,
        occupiedUnits: 0,
        monthlyRentTotal: 0,
      });

      toast("Property created", {
        description: `${created.name} has been added to your portfolio.`,
      });
    } catch (error) {
      console.error("Failed to create property", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to create property right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = <K extends keyof PropertyFormState>(
    key: K,
    value: PropertyFormState[K]
  ) => {
    setNewProperty((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <PropertiesHeader onAddProperty={() => setIsDialogOpen(true)} />

      <PropertiesGridSection
        properties={properties}
        selectedPropertyId={selectedPropertyId}
        isLoading={isLoading}
        loadError={loadError}
        onSelectProperty={(propertyId) => setSelectedPropertyId(propertyId)}
        onRetry={() => window.location.reload()}
      />

      <UnitsSection property={selectedProperty} />

      <AddPropertyDialog
        open={isDialogOpen}
        newProperty={newProperty}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onOpenChange={setIsDialogOpen}
        onChange={handleFormChange}
        onSubmit={handleCreateProperty}
      />
    </div>
  );
}

export function PropertiesPage() {
  return <PropertiesPageInternal />;
}

export default PropertiesPage;

function normalizeProperty(property: ApiProperty): PropertySummary {
  return {
    id: String(property.id),
    name: property.name ?? "Untitled property",
    addressLine1:
      property.addressLine1 ??
      property.address_line1 ??
      property.address ??
      "Address unavailable",
    city: property.city ?? "",
    state: property.state ?? "",
    country: property.country ?? "",
    imageUrl:
      property.imageUrl ?? property.image_url ?? property.image ?? DEFAULT_IMAGE_URL,
    totalUnits:
      property.totalUnits ?? property.total_units ?? property.units?.length ?? 0,
    occupiedUnits: property.occupiedUnits ?? property.occupied_units ?? 0,
    monthlyRentTotal: property.monthlyRentTotal ?? property.monthly_rent_total ?? 0,
    units: property.units ?? [],
  };
}