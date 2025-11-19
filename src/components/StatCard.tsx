import { Card,CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  primaryValue: string;
  secondaryLine?: string;
  footer?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg,
  title,
  primaryValue,
  secondaryLine,
  footer,
}) => (
  <Card className="border-slate-200 bg-white shadow-sm rounded-2xl">
    <CardContent className=" flex flex-col gap-3">
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full",
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
