// src/pages/Payments/PaymentsPage.tsx 
//Remember folders under "pages start with upper case

import { useState } from "react"; // we import useState because later we will probably need to track filters
// selected rows, UI changes, etc. Even if we dont use it yet, this page
// normally needs some local state for payments like status filter, search

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// we pull in shadcn card nacim components because this page will use a card layout to group payment info . So it looks cleaner instead of raw divs
//esto es un easter egg

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";




// simple union type so the status can only be these 3 strings
//  do not get scared , this is only to avoid typos like "pendng" and makes the flow safer.
type PaymentStatus = "Paid" | "Pending" | "Overdue";

// this is just the shape of each payment row.
// helps TypeScript catch errors and keeps everything consistens but I will adapt this when we got the models from the backends
//hurry nacim :D
type TenantPaymentRow = {
  id: number;
  tenant: string;
  property: string;
  unit: string;
  amountDue: number;
  dueDate: string;
  status: PaymentStatus; // forced to be one of the 3 above
  paidDate: string | null; // null when still unpaid
};

// fake data for now, just to build the UI, do not hate
//it will be deleted when the backend is conected :p
const MOCK_ROWS: TenantPaymentRow[] = [
  {
    id: 1,
    tenant: "Sarah Johnson",
    property: "Sunset Apartments",
    unit: "Unit 204",
    amountDue: 1850,
    dueDate: "Nov 1",
    status: "Paid",
    paidDate: "Oct 30",
  },
  {
    id: 2,
    tenant: "Michael Chen",
    property: "Sunset Apartments",
    unit: "Unit 102",
    amountDue: 1800,
    dueDate: "Nov 1",
    status: "Pending",
    paidDate: null,
  }
];

// Just the main payments page layout
function PaymentsPage() {
  //this nice constant will help to manage the state for the dropdown filter. (later will be linked to the GUI :D)
  // default is all , so show all 
  const [propertyFilter, setPropertyFilter] = useState("all");
  
  //This calculates the rows depending on the filter,  , if filter is all (by default) , we show everything
  const filteredRows =
    propertyFilter === "all"
      ? MOCK_ROWS
      : MOCK_ROWS.filter((row) => row.property === propertyFilter);

  //this one recalculated
return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-6 space-y-8">
        
        {/* ---------- Page Header ---------- */}
        <header className="space-y-1 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Payment Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Track rent collection across all properties.
          </p>
        </header>

        {/* ---------- Summary row with KPI cards ---------- */}
        <SummaryRow />

        {/* ---------- Monthly trend + quick stats ---------- */}
        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <MonthlyTrendCard />
          <QuickStatsCard />
        </div>

        {/* ---------- Payments table for current month ---------- */}
        <CurrentMonthStatusCard
          rows={filteredRows}
          propertyFilter={propertyFilter}
          onPropertyFilterChange={setPropertyFilter}
        />
      </div>
    </div>
  );
}


// Summary Cards----------------------------------------

function SummaryRow() {                         
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">      // layout for kpi cards
      <SummaryCard title="Collected (Nov)" amount="$40,250" subtitle="20 of 22 units" />  // money in
      <SummaryCard title="Pending" amount="$2,550" subtitle="2 units" />                  // waiting to be paid
      <SummaryCard title="Overdue" amount="$0" subtitle="0 units" />                      // late payments
      <SummaryCard title="Collection Rate" amount="94%" subtitle="+3% vs last month" />   // main percent stat
    </div>
  );
}


type SummaryCardProps = {
  title: string;
  amount: string;
  subtitle: string;
};


// Reusable small KPI card
function SummaryCard({ title, amount, subtitle }: SummaryCardProps) {
  return (
    <Card>                                                     // card wrap
      <CardHeader className="space-y-1 pb-2 text-left">        // top area
        <p className="text-[11px] font-medium uppercase text-muted-foreground">{title}</p>   // tiny label
        <p className="text-2xl font-semibold leading-none">{amount}</p>                      // big number
      </CardHeader>
      <CardContent className="text-left">                     // bottom area
        <p className="text-xs text-muted-foreground">{subtitle}</p>                           // small detail
      </CardContent>
    </Card>
  );
}



//ensaladini estuvo aqui
export default PaymentsPage;


