// Dashboard.tsx
import React from "react";
import {
  Building2,
  DollarSign,
  Users,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { StatCard } from "../../../components/StatCard";
import { RentPill } from "./RentPill";

/* ---------- Types para los datos que vienen del API (vía props) ---------- */

export type OverviewStats = {
  totalUnits: {
    units: number;
    propertiesLabel: string;    // ej. "3 properties"
    deltaLabel: string;         // ej. "+2 this month"
  };
  monthlyRevenue: {
    amountLabel: string;        // ej. "$42,800"
    collectedLabel: string;     // ej. "94% collected"
    deltaLabel: string;         // ej. "+8% vs last month"
  };
  occupancy: {
    rateLabel: string;          // ej. "92%"
    summaryLabel: string;       // ej. "22 of 24 occupied"
    deltaLabel: string;         // ej. "+4% vs last month"
  };
  openRequests: {
    count: number;              // ej. 7
    summaryLabel: string;       // ej. "3 urgent"
    deltaLabel: string;         // ej. "2 new today"
  };
};

export type RentBucket = {
  amountLabel: string;          // ej. "$40,250"
  paymentsLabel: string;        // ej. "20 payments"
};

export type RentCollection = {
  collected: RentBucket;
  pending: RentBucket;
  overdue: RentBucket;
};



export type PeriodOption = {
  label: string;                // ej. "November 2024"
  value: string;                // ej. "2024-11"
};

export type DashboardProps = {
  greeting?: string;            // texto del saludo cálido
  subheadingDateLabel: string;  // ej. "November 2024"

  overview: OverviewStats;

  rentCollection: RentCollection;

  periodOptions: PeriodOption[];
  currentPeriodValue: string;
  onPeriodChange?: (value: string) => void;

  urgentCount?: number;         // si no lo pasas, se calcula de alerts

  rentCollectionChartSlot?: React.ReactNode; // aquí puedes pasar tu gráfico
};

/* ---------- Componente principal ---------- */

export const Dashboard: React.FC<DashboardProps> = ({
  greeting = "Welcome back, Landlord 👋",
  subheadingDateLabel,
  overview,
  rentCollection,
  periodOptions,
  currentPeriodValue,
  onPeriodChange,
  urgentCount,
  rentCollectionChartSlot,
}) => {
 
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* HEADER: saludo cálido */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {greeting}
          </h1>
          <p className="text-sm text-slate-500">{subheadingDateLabel}</p>
        </div>

        <div>{/* Action Buttons?? */}</div>
      </div>

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<Building2 className="h-5 w-5 rounded-full text-blue-500" />}
          iconBg="bg-blue-50"
          title="Total Units"
          primaryValue={overview.totalUnits.units.toString()}
          secondaryLine={overview.totalUnits.propertiesLabel}
          footer={overview.totalUnits.deltaLabel}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 rounded-full text-emerald-500" />}
          iconBg="bg-emerald-50"
          title="Monthly Revenue"
          primaryValue={overview.monthlyRevenue.amountLabel}
          secondaryLine={overview.monthlyRevenue.collectedLabel}
          footer={overview.monthlyRevenue.deltaLabel}
        />
        <StatCard
          icon={<Users className="h-5 w-5 rounded-full text-indigo-500" />}
          iconBg="bg-indigo-50"
          title="Occupancy Rate"
          primaryValue={overview.occupancy.rateLabel}
          secondaryLine={overview.occupancy.summaryLabel}
          footer={overview.occupancy.deltaLabel}
        />
        <StatCard 
          icon={<Wrench className="h-5 w-5 rounded-full text-orange-500" />}
          iconBg="bg-orange-50"
          title="Open Requests"
          primaryValue={overview.openRequests.count.toString()}
          secondaryLine={overview.openRequests.summaryLabel}
          footer={overview.openRequests.deltaLabel}

        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1.2fr]">
        {/* RENT COLLECTION */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold text-slate-900">
              Rent Collection
            </CardTitle>

            <select
              className="text-xs rounded-lg border border-slate-200 bg-white px-3 py-1 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={currentPeriodValue}
              onChange={(e) => onPeriodChange?.(e.target.value)}
              disabled={!onPeriodChange}
            >
              {periodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </CardHeader>

          <CardContent className=" rounded-2xl -m-2 p-4 pt-2">
            <div className="grid gap-4 md:grid-cols-3">
              <RentPill
                label="Collected"
                amount={rentCollection.collected.amountLabel}
                detail={rentCollection.collected.paymentsLabel}
                className="bg-emerald-50 border-emerald-100"
              />
              <RentPill
                label="Pending"
                amount={rentCollection.pending.amountLabel}
                detail={rentCollection.pending.paymentsLabel}
                className="bg-amber-50 border-amber-100"
              />
              <RentPill
                label="Overdue"
                amount={rentCollection.overdue.amountLabel}
                detail={rentCollection.overdue.paymentsLabel}
                className="bg-rose-50 border-rose-100"
              />
            </div>

            {rentCollectionChartSlot && (
              <div className="mt-6 h-40 rounded-2xl bg-white/70 border border-slate-200">
                {rentCollectionChartSlot}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ALERTS */}
        <Card className=" bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold text-slate-900">
              Alerts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="text-sm text-slate-500">
              You have {urgentCount ?? 0} urgent alerts that need your
              attention.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
