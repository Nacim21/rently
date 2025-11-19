// src/pages/Payments/components/CurrentMonthStatusCard.tsx

// this file is all about the big table for the current month stuff
// kinda the main detailed view for payments down in the page
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

import type { TenantPaymentRow, PaymentStatus } from "../PaymentsPage";

// props that this card needs so it can show things right
// rows is the full list for the table
// propertyFilter tells which property is active in the dropdown
// onPropertyFilterChange will update the filter when user picks a new thing
type Props = {
  rows: TenantPaymentRow[];
  propertyFilter: string;
  onPropertyFilterChange: (value: string) => void;
};

// this big card is the lower part of the payments page
// landlord scrolls here when they want more details not just summary stuff
export function CurrentMonthStatusCard({
  rows,
  propertyFilter,
  onPropertyFilterChange,
}: Props) {
  return (
    // card gets softer border and little shadow so it feels more like a ui design not raw table
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* header holds title on the left and controls on the right side */}
      <CardHeader className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          {/* main title for this section kind of short and clean */}
          <CardTitle className="text-base">Current Month Status</CardTitle>
          {/* tiny helper text so user knows this is just for the current month not the whole year */}
          <p className="text-sm text-muted-foreground">
            Overview of this month&apos;s rent status for each unit.
          </p>
        </div>

        {/* right chunk with filter dropdown and export button side by side */}
        <div className="flex items-center gap-2">
          {/* property select keeps track of which building is active so table can be filtered */}
          {/* this using same state from parent page so the logic stays in one place */}
          <Select
            value={propertyFilter}
            onValueChange={onPropertyFilterChange}
          >
            {/* trigger is the part that you click it shows the selected property name */}
            <SelectTrigger className="h-8 w-[160px] rounded-lg border-slate-200 bg-slate-50 text-xs">
              {/* placeholder text shows when nothing set yet mostly just first time load */}
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            {/* dropdown body with actual options for each property name */}
            <SelectContent>
              {/* value all means do not filter just show every row */}
              <SelectItem value="all">All Properties</SelectItem>
              {/* each of these matches the property string from the mock rows above in parent */}
              <SelectItem value="Sunset Apartments">
                Sunset Apartments
              </SelectItem>
              <SelectItem value="Pine Plaza">Pine Plaza</SelectItem>
              <SelectItem value="Oak Residences">Oak Residences</SelectItem>
            </SelectContent>
          </Select>

          {/* export button lets user pretend they can download stuff for excel or reports */}
          {/* icon is small so it does not fight the label but still hints this is download ish */}
          <Button
            variant="outline"
            className="flex h-8 items-center gap-1 rounded-lg border-slate-200 bg-white px-3 text-xs"
          >
            <Download className="h-3 w-3" />
            <span>Export</span>
          </Button>
        </div>
      </CardHeader>

      {/* table content section has zero padding so lines match card edges nice and straight */}
      <CardContent className="p-0">
        {/* wrapper lets the table scroll sideways if screen is too tiny so layout does not break hard */}
        <div className="overflow-x-auto">
          <Table>
            {/* table head is the grey row at top fonts a bit smaller but bold and uppercase */}
            <TableHeader className="bg-slate-50/70">
              <TableRow>
                {/* each header cell is tuned to look more like the prototype style */}
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tenant
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Property &amp; Unit
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Amount Due
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Due Date
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Paid Date
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* here we loop all the rows and drop one table row for each tenant */}
              {rows.map((row) => (
                // each row shows one tenant payment situation
                // hover color just makes it feel more alive when you move the mouse over it
                // border on bottom keeps rows separated so eyes follow easier
                <TableRow
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-slate-50/70"
                >
                  {/* tenant name first so user can scan quickly by person */}
                  <TableCell className="whitespace-nowrap text-sm font-medium text-slate-800">
                    {row.tenant}
                  </TableCell>

                  {/* property and unit stacked so things fit better on narrow widths */}
                  <TableCell>
                    <div className="flex flex-col">
                      {/* property title first more important text */}
                      <span className="text-sm text-slate-800">
                        {row.property}
                      </span>
                      {/* smaller unit info under it less loud but still clear */}
                      <span className="text-xs text-muted-foreground">
                        {row.unit}
                      </span>
                    </div>
                  </TableCell>

                  {/* money cell right aligned so digits line up and are easier to compare */}
                  <TableCell className="whitespace-nowrap text-right text-sm font-semibold text-slate-900">
                    ${row.amountDue.toLocaleString()}
                  </TableCell>

                  {/* basic due date probably same day for most rows but still nice to show */}
                  <TableCell className="text-sm text-slate-700">
                    {row.dueDate}
                  </TableCell>

                  {/* status shows badge friend which picks colors based on paid or not */}
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>

                  {/* paid date can be null so we show a dash when no payment yet */}
                  <TableCell className="text-sm text-slate-700">
                    {row.paidDate ?? (
                      <span className="text-muted-foreground">-</span>
                    )}
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

// tiny type to describe what the badge helper needs from the outside
type StatusBadgeProps = {
  status: PaymentStatus;
};

// badge style helper so we dont repeat class strings a bunch of times
// this keeps the vibe of each status in one place so easy to tweak later
function StatusBadge({ status }: StatusBadgeProps) {
  // here we pick different pastel colors for each status word
  // paid is green pending looks amber overdue is red so pretty standard vibe
  const style =
    status === "Paid"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : status === "Pending"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    // badge is outline variant so we can control border and soft fill by hand
    // rounded full makes it more like a pill chip instead of a hard rectangle
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-0.5 text-xs font-medium border ${style}`}
    >
      {/* just print the status text straight no icon to keep it simple */}
      {status}
    </Badge>
  );
}
