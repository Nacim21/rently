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


/* ---------- Monthly trend card ---------- */

// Shows the monthly payments trend. Right now it only displays a placeholder.
// Later this will render a real chart (Recharts, Chart.js, Tremor, etc.)
function MonthlyTrendCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between space-y-0 pb-3">
        
        {/* Title */}
        <CardTitle className="text-base">Monthly Collection Trend</CardTitle>

        {/* Dropdown to pick the time range */}
        <Select defaultValue="12m">
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Last 12 Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {/* Chart placeholder (replace with chart library later) */}
        <div className="h-52 rounded-lg border border-dashed border-muted-foreground/30 bg-gradient-to-b from-primary/5 to-transparent" />

        {/* Helper text */}
        <p className="mt-2 text-xs text-muted-foreground">
          Chart placeholder — integrate a chart library here later.
        </p>
      </CardContent>
    </Card>
  );
}



/* quick stats card ---------------------------------------------------------- */
function QuickStatsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Quick Stats</CardTitle>     {/* title */}
      </CardHeader>

      <CardContent className="space-y-3 text-sm">                   {/* list of stats */}
        <StatRow label="Average Collection Time" value="2.3 days" />  {/* avg days */}
        <StatRow label="On-Time Payments" value="91%" />              {/* good pays */}
        <StatRow label="Late Payments (Nov)" value="0" />             {/* late count */}
        <StatRow label="Payment Method" value="78% Online" />         {/* method info */}
      </CardContent>
    </Card>
  );
}

type StatRowProps = {
  label: string;
  value: string;
};

function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex items-center justify-between">             {/* row layout */}
      <span className="text-sm text-muted-foreground">{label}</span> {/* label */}
      <span className="text-sm font-medium">{value}</span>           {/* value */}
    </div>
  );
}

/* current month table ------------------------------------------------------- */
type CurrentMonthStatusCardProps = {
  rows: TenantPaymentRow[];
  propertyFilter: string;
  onPropertyFilterChange: (value: string) => void;
};

function CurrentMonthStatusCard({
  rows,
  propertyFilter,
  onPropertyFilterChange,
}: CurrentMonthStatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-base">Current Month Status</CardTitle>    {/* title */}
          <p className="text-sm text-muted-foreground">
            Overview for this month
          </p>                                                                  {/* subtitle */}
        </div>

        <div className="flex items-center gap-2">                              {/* filters */}
          <Select value={propertyFilter} onValueChange={onPropertyFilterChange}> {/* prop filter */}
            <SelectTrigger className="h-8 w-[160px] text-xs">
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>               {/* all */}
              <SelectItem value="Sunset Apartments">Sunset Apartments</SelectItem>
              <SelectItem value="Pine Plaza">Pine Plaza</SelectItem>
              <SelectItem value="Oak Residences">Oak Residences</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-8 px-3 text-xs">Export</Button> {/* export btn */}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">                                      {/* scroll on small */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>                                   {/* name */}
                <TableHead>Property & Unit</TableHead>                          {/* prop info */}
                <TableHead className="text-right">Amount Due</TableHead>        {/* money */}
                <TableHead>Due Date</TableHead>                                 {/* date */}
                <TableHead>Status</TableHead>                                   {/* status */}
                <TableHead>Paid Date</TableHead>                                {/* paid day */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (                                              /* each row */
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.tenant}</TableCell>   {/* tenant */}

                  <TableCell>
                    <div className="flex flex-col">
                      <span>{row.property}</span>                               {/* property */}
                      <span className="text-xs text-muted-foreground">
                        {row.unit}                                              {/* unit */}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    ${row.amountDue.toLocaleString()}                           {/* amount */}
                  </TableCell>

                  <TableCell>{row.dueDate}</TableCell>                          {/* due */}
                  <TableCell><StatusBadge status={row.status} /></TableCell>    {/* status */}
                  <TableCell>
                    {row.paidDate ?? <span className="text-muted-foreground">-</span>} {/* paid */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

/* status badge -------------------------------------------------------------- */
type StatusBadgeProps = { status: PaymentStatus };

function StatusBadge({ status }: StatusBadgeProps) {
  const styles =
    status === "Paid"      ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
    status === "Pending"   ? "bg-amber-50 text-amber-700 border-amber-100" :
                             "bg-rose-50 text-rose-700 border-rose-100";        /* late */

  return (
    <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium border ${styles}`}>
      {status}                                                                  {/* label */}
    </Badge>
  );
}





//ensaladini estuvo aqui
export default PaymentsPage;


