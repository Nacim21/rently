// src/pages/Payments/PaymentsPage.tsx 
//Remember folders under "pages start with upper case

import { useState } from "react"; // we import useState because later we will probably need to track filters
// selected rows, UI changes, etc. Even if we dont use it yet, this page
// normally needs some local state for payments like status filter, search

import { SummaryRow } from "./components/SummaryRow";
import { MonthlyTrendAndStats } from "./components/MonthlyTrendAndStats";
import { CurrentMonthStatusCard } from "./components/CurrentMonthStatusCard";

export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export type TenantPaymentRow = {
  id: number;
  tenant: string;
  property: string;
  unit: string;
  amountDue: number;
  dueDate: string;
  status: PaymentStatus;
  paidDate: string | null;
};

// this is a small fake dataset so the page looks full while designing please do not get scared :p
const MOCK_ROWS: TenantPaymentRow[] = [
  {
    id: 1,
    tenant: "Emiliano Garcia",
    property: "Sunset Apartments",
    unit: "Unit 204",
    amountDue: 1850,
    dueDate: "Nov 1",
    status: "Paid",
    paidDate: "Oct 30",
  },
  {
    id: 2,
    tenant: "Christian Servin",
    property: "Sunset Apartments",
    unit: "Unit 102",
    amountDue: 1800,
    dueDate: "Nov 1",
    status: "Pending",
    paidDate: null,
  },
  {
    id: 3,
    tenant: "Cesar Tirado",
    property: "Pine Plaza",
    unit: "Unit 303",
    amountDue: 1900,
    dueDate: "Nov 1",
    status: "Paid",
    paidDate: "Nov 1",
  },
  {
    id: 4,
    tenant: "Sergio Laptchop Rocha",
    property: "Oak Residences",
    unit: "Unit 201",
    amountDue: 1950,
    dueDate: "Nov 1",
    status: "Paid",
    paidDate: "Oct 31",
  },
];

export default function PaymentsPage() {
  // this state tracks the property filter used by the dropdown on the table card
  const [propertyFilter, setPropertyFilter] = useState<string>("all");

  // this prepares the rows so the table only shows what matches the selected property
  const rows =
    propertyFilter === "all"
      ? MOCK_ROWS
      : MOCK_ROWS.filter((r) => r.property === propertyFilter);

  return (
    // this wrapper is just spacing for the content since the outer layout handles the rest
    <div className="space-y-8 lg:space-y-10">
      {/* page header title and helper text */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Payment Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Track rent collection across all properties.
        </p>
      </header>

      {/* top summary cards for the main payment stats */}
      <SummaryRow />

      {/* middle section with the trend chart and the quick stats card */}
      <MonthlyTrendAndStats />

      {/* bottom card with the detailed tenant table and filter */}
      <CurrentMonthStatusCard
        rows={rows}
        propertyFilter={propertyFilter}
        onPropertyFilterChange={setPropertyFilter}
      />
    </div>
  );
}
