import { cn } from "@/lib/utils";

type RentPillProps = {
  label: string;
  amount: string;
  detail: string;
  className?: string;
};

export const RentPill: React.FC<RentPillProps> = ({
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
