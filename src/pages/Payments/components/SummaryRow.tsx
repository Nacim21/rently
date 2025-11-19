// src/pages/Payments/components/SummaryRow.tsx

// this component basically is for those small cards at the top of payments page
// each card shows like a quick metric so user dont get lost right away, is kinda summary section

import type { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock3, XCircle, TrendingUp } from "lucide-react"

// this props is just what each card needs, nothing too fancy
type SummaryCardProps = {
  title: string        // small label, like pending or collected
  amount: string       // the big main number
  subtitle: string     // extra info so user knows what the number actually means
  icon: ReactNode      // icon we pass from parent so card is reusable
  iconBgClass: string  // background color for the icon bubble because design wants that soft color look
}

// smaller component that just renders 1 card, we reuse it four times in the row
function SummaryCard({
  title,
  amount,
  subtitle,
  icon,
  iconBgClass,
}: SummaryCardProps) {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* header part, shows icon and the title+amount, nothing complicated */}
      <CardHeader className="flex flex-col gap-4 pb-4 text-left">

        {/* this div just holds the icon bubble, the bubble is for aesthetics kinda like modern dashbaords */}
        <div className="flex items-center justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgClass}`}
          >
            {icon}
          </div>
        </div>

        {/* text stuff, title is small upper text amount is the big number */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>

          {/* main number, this is what user sees first basically */}
          <CardTitle className="text-2xl font-semibold leading-none">
            {amount}
          </CardTitle>
        </div>
      </CardHeader>

      {/* subtitle is just extra context so user dont misinterpret the number */}
      <CardContent className="pt-0 text-left">
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

// this component is the row containing all summary cards, basically the top section of payments page
// grid is responsive so it dont look ugly in small screens
export function SummaryRow() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* these are mock values for now, later we will plug real data or state:-Ensaladini estuvo aqui */}
      <SummaryCard
        title="Collected (Nov)"
        amount="$40,250"
        subtitle="20 of 22 units"
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        iconBgClass="bg-emerald-50"
      />

      <SummaryCard
        title="Pending"
        amount="$2,550"
        subtitle="2 units"
        icon={<Clock3 className="h-5 w-5 text-amber-500" />}
        iconBgClass="bg-amber-50"
      />

      <SummaryCard
        title="Overdue"
        amount="$0"
        subtitle="0 units"
        icon={<XCircle className="h-5 w-5 text-rose-500" />}
        iconBgClass="bg-rose-50"
      />


      <SummaryCard
        title="Collection Rate"
        amount="94%"
        subtitle="+3% vs last month"
        icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        iconBgClass="bg-blue-50"
      />
    </div>
  )
}

