
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