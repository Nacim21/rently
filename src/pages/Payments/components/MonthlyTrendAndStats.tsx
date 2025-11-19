// src/pages/Payments/components/MonthlyTrendAndStats.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// this type is for one quick stat line on the right card
// feels easier to read like this even if it is super simple
type StatRowProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

// this small row is reused for each stat in the quick panel
// keeps layout even so stuff does not jump around alot
function StatRow({ label, value, valueClassName }: StatRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium tracking-wide text-slate-400">
        {label}
      </span>
      <span className={`text-sm font-semibold ${valueClassName ?? ""}`}>
        {value}
      </span>
    </div>
  );
}

// this whole block is the middle section with the chart and the quick stats
// only touches the payments page so rest of app stil looks the same
export function MonthlyTrendAndStats() {
  return (
    // grid splits into big chart on left and narrow stats card on right
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      {/* left card shows the monthly trend chart thing */}
      <Card className="h-full rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Monthly Collection Trend</CardTitle>
          {/* this select is just a fake filter for now but helps sell the ui */}
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
          {/* this is a fake chart box with soft blue gradient so it feels closer to the prototype */}
          <div className="flex h-56 flex-col justify-between rounded-xl border border-slate-100 bg-gradient-to-b from-blue-50 to-white px-6 py-4">
            {/* this inner block pretends to be the actual line chart area */}
            <div className="flex-1 rounded-lg bg-white/40" />
            {/* tiny month labels just to hint there is a time axis here */}
            <div className="mt-4 flex justify-between text-[10px] text-slate-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
          {/* this text just reminds future me that the real chart goes here later */}
          <p className="mt-2 text-xs text-muted-foreground">
            Chart placeholder integrate a real chart library here when ready
          </p>
        </CardContent>
      </Card>

      {/* right card is the quick stats panel with tiny bold numbers */}
      <Card className="h-full rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Stats</CardTitle>
        </CardHeader>
        {/* spacing here keeps each stat line comfy so it does not feel cramped */}
        <CardContent className="space-y-4">
          <StatRow
            label="Average Collection Time"
            value="2.3 days"
            valueClassName="text-amber-600"
          />
          <StatRow
            label="On Time Payments"
            value="91%"
            valueClassName="text-emerald-600"
          />
          <StatRow
            label="Late Payments Nov"
            value="0"
            valueClassName="text-slate-800"
          />
          <StatRow
            label="Payment Method"
            value="78% Online"
            valueClassName="text-blue-600"
          />
        </CardContent>
      </Card>
    </div>
  );
}
