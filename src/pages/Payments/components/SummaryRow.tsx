// src/pages/Payments/components/SummaryRow.tsx

// this component is the row containing all summary cards, basically the top section of payments page

import { CheckCircle2, Clock3, XCircle, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/StatCard" // ⬅️ ajusta el path si es distinto en tu proyecto

export function SummaryRow() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Collected (Nov) */}
      <StatCard
        title="Collected (Nov)"
        primaryValue="$40,250"
        secondaryLine="20 of 22 units"
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        iconBg="bg-emerald-50"
      />

      {/* Pending */}
      <StatCard
        title="Pending"
        primaryValue="$2,550"
        secondaryLine="2 units"
        icon={<Clock3 className="h-5 w-5 text-amber-500" />}
        iconBg="bg-amber-50"
      />

      {/* Overdue */}
      <StatCard
        title="Overdue"
        primaryValue="$0"
        secondaryLine="0 units"
        icon={<XCircle className="h-5 w-5 text-rose-500" />}
        iconBg="bg-rose-50"
      />

      {/* Collection Rate */}
      <StatCard
        title="Collection Rate"
        primaryValue="94%"
        secondaryLine="+3% vs last month"
        icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        iconBg="bg-blue-50"
      />
    </div>
  )
}
