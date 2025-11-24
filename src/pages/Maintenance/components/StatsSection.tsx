// src/pages/Maintenance/components/StatsSection.tsx
import { AlertCircle, Clock, Wrench, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";

type StatsSectionProps = {
  stats: {
    urgent: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        icon={<AlertCircle className="h-5 w-5 rounded-full text-red-500" />}
        iconBg="bg-red-50"
        title="Urgent"
        primaryValue={stats.urgent.toString()}
        secondaryLine="Requires immediate attention"
        footer="High priority items"
      />
      <StatCard
        icon={<Clock className="h-5 w-5 rounded-full text-amber-500" />}
        iconBg="bg-amber-50"
        title="Pending"
        primaryValue={stats.pending.toString()}
        secondaryLine="Awaiting assignment"
        footer="Not yet started"
      />
      <StatCard
        icon={<Wrench className="h-5 w-5 rounded-full text-blue-500" />}
        iconBg="bg-blue-50"
        title="In Progress"
        primaryValue={stats.inProgress.toString()}
        secondaryLine="Currently being worked on"
        footer="Active work orders"
      />
      <StatCard
        icon={<CheckCircle className="h-5 w-5 rounded-full text-emerald-500" />}
        iconBg="bg-emerald-50"
        title="Completed"
        primaryValue={stats.completed.toString()}
        secondaryLine="Successfully resolved"
        footer="Finished this month"
      />
    </div>
  );
}
