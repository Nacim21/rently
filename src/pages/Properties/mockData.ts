// src/pages/Properties/mockData.ts
//temporary file until we hook up backend

import type { PropertySummary, UnitSummary } from "./types";

export const MOCK_PROPERTIES: PropertySummary[] = [
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
    monthlyRentTotal: 22_200,
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
    monthlyRentTotal: 14_400,
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
    monthlyRentTotal: 6_200,
  },
];

export const MOCK_UNITS: UnitSummary[] = [
  // Pine Plaza units
  {
    id: "pine-101",
    propertyId: "pine-plaza",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 1_850,
    tenantName: "Sarah Johnson",
    leaseEndDate: "2024-12-31",
  },
  {
    id: "pine-102",
    propertyId: "pine-plaza",
    unitNumber: "Unit 102",
    status: "occupied",
    monthlyRent: 1_800,
    tenantName: "Michael Chen",
    leaseEndDate: "2025-03-15",
  },
  {
    id: "pine-103",
    propertyId: "pine-plaza",
    unitNumber: "Unit 103",
    status: "occupied",
    monthlyRent: 1_900,
    tenantName: "Emily Rodriguez",
    leaseEndDate: "2025-06-30",
  },
  {
    id: "pine-104",
    propertyId: "pine-plaza",
    unitNumber: "Unit 104",
    status: "vacant",
    monthlyRent: 1_850,
  },
  {
    id: "pine-201",
    propertyId: "pine-plaza",
    unitNumber: "Unit 201",
    status: "occupied",
    monthlyRent: 1_950,
    tenantName: "David Kim",
    leaseEndDate: "2025-10-15",
  },
  {
    id: "pine-202",
    propertyId: "pine-plaza",
    unitNumber: "Unit 202",
    status: "occupied",
    monthlyRent: 1_900,
    tenantName: "Lisa Anderson",
    leaseEndDate: "2025-08-31",
  },

  // Example units for the other properties
  {
    id: "sunset-101",
    propertyId: "sunset-apartments",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 2_100,
    tenantName: "James Miller",
    leaseEndDate: "2025-04-01",
  },
  {
    id: "oak-101",
    propertyId: "oak-residences",
    unitNumber: "Unit 101",
    status: "occupied",
    monthlyRent: 1_700,
    tenantName: "Ana Lopez",
    leaseEndDate: "2025-02-20",
  },
];
