// src/pages/Properties/types.ts

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
  monthlyRentTotal: number; // aggregated rent for this property
};

export type UnitStatus = "occupied" | "vacant";

export type UnitSummary = {
  id: string;
  propertyId: string;
  unitNumber: string;
  status: UnitStatus;
  monthlyRent: number;
  tenantName?: string; // undefined when vacant
  // backend will send ISO 8601 string later, e.g. "2025-06-30"
  leaseEndDate?: string;
};
