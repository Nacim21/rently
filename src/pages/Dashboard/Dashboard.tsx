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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

export type DashboardAlertSeverity = "high" | "medium" | "low";

export type DashboardAlert = {
  id: string;
  severity: DashboardAlertSeverity;
  title: string;
  description: string;
  timeAgoLabel: string;         // ej. "2 hours ago"
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

  alerts: DashboardAlert[];
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
  alerts,
  urgentCount,
  rentCollectionChartSlot,
}) => {
  const computedUrgent =
    typeof urgentCount === "number"
      ? urgentCount
      : alerts.filter((a) => a.severity === "high").length;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* HEADER: saludo cálido */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {greeting}
          </h1>
          <p className="text-sm text-slate-500">{subheadingDateLabel}</p>
        </div>

        {computedUrgent > 0 && (
          <Badge className="rounded-full bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 text-xs font-medium">
            {computedUrgent} urgent
          </Badge>
        )}
      </div>

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<Building2 className="h-5 w-5 text-blue-500" />}
          iconBg="bg-blue-50"
          title="Total Units"
          primaryValue={overview.totalUnits.units.toString()}
          secondaryLine={overview.totalUnits.propertiesLabel}
          footer={overview.totalUnits.deltaLabel}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
          iconBg="bg-emerald-50"
          title="Monthly Revenue"
          primaryValue={overview.monthlyRevenue.amountLabel}
          secondaryLine={overview.monthlyRevenue.collectedLabel}
          footer={overview.monthlyRevenue.deltaLabel}
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-indigo-500" />}
          iconBg="bg-indigo-50"
          title="Occupancy Rate"
          primaryValue={overview.occupancy.rateLabel}
          secondaryLine={overview.occupancy.summaryLabel}
          footer={overview.occupancy.deltaLabel}
        />
        <StatCard
          icon={<Wrench className="h-5 w-5 text-orange-500" />}
          iconBg="bg-orange-50"
          title="Open Requests"
          primaryValue={overview.openRequests.count.toString()}
          secondaryLine={overview.openRequests.summaryLabel}
          footer={overview.openRequests.deltaLabel}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1.2fr]">
        {/* RENT COLLECTION */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
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

          <CardContent className="bg-gradient-to-b from-white to-slate-50 rounded-2xl -m-2 p-4 pt-2">
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
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold text-slate-900">
              Alerts
            </CardTitle>
            {computedUrgent > 0 && (
              <Badge className="rounded-full bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 text-xs font-medium">
                {computedUrgent} urgent
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            {alerts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-xs text-slate-400">
                No alerts at the moment.
              </div>
            ) : (
              alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* ---------- Subcomponents de UI, sin datos mock ---------- */

type StatCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  primaryValue: string;
  secondaryLine?: string;
  footer?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg,
  title,
  primaryValue,
  secondaryLine,
  footer,
}) => (
  <Card className="border-slate-200 shadow-sm rounded-2xl">
    <CardContent className="p-5 flex flex-col gap-3">
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl",
          iconBg
        )}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-semibold text-slate-900">{primaryValue}</p>
        {secondaryLine && (
          <p className="text-xs text-slate-500">{secondaryLine}</p>
        )}
      </div>
      {footer && <p className="mt-1 text-xs text-emerald-600">{footer}</p>}
    </CardContent>
  </Card>
);

type RentPillProps = {
  label: string;
  amount: string;
  detail: string;
  className?: string;
};

const RentPill: React.FC<RentPillProps> = ({
  label,
  amount,
  detail,
  className,
}) => (
  <div
    className={cn(
      "rounded-2xl border px-4 py-4 flex flex-col gap-1",
      className
    )}
  >
    <p className="text-xs font-medium text-slate-600">{label}</p>
    <p className="text-2xl font-semibold text-slate-900">{amount}</p>
    <p className="text-xs text-slate-500">{detail}</p>
  </div>
);

const severityStyles: Record<DashboardAlertSeverity, string> = {
  high: "bg-rose-50 border-rose-100",
  medium: "bg-amber-50 border-amber-100",
  low: "bg-sky-50 border-sky-100",
};

const dotColor: Record<DashboardAlertSeverity, string> = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-sky-500",
};

const AlertItem: React.FC<{ alert: DashboardAlert }> = ({ alert }) => (
  <div
    className={cn(
      "rounded-2xl border px-4 py-3 flex flex-col gap-1",
      severityStyles[alert.severity]
    )}
  >
    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
      <span
        className={cn("h-2.5 w-2.5 rounded-full", dotColor[alert.severity])}
      />
      <span>{alert.title}</span>
    </div>
    <p className="text-xs text-slate-600">{alert.description}</p>
    <p className="text-[11px] text-slate-500">{alert.timeAgoLabel}</p>
  </div>
);
