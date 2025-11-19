// DashboardPage.tsx
import React from "react";
import {
  Dashboard
} from "./components/Dashboard";

import type {
  OverviewStats,
  RentCollection,
  PeriodOption
} from "./components/Dashboard";
import type { DashboardAlert } from "./components/AlertPill";

export const DashboardPage: React.FC = () => {
  // Period state – later you can sync this with your API query params
  const [currentPeriod, setCurrentPeriod] = React.useState("2024-11");

  // Temporary data for now – replace with real API data later
  const overview: OverviewStats = {
    totalUnits: {
      units: 24,
      propertiesLabel: "3 properties",
      deltaLabel: "+2 this month",
    },
    monthlyRevenue: {
      amountLabel: "$42,800",
      collectedLabel: "94% collected",
      deltaLabel: "+8% vs last month",
    },
    occupancy: {
      rateLabel: "92%",
      summaryLabel: "22 of 24 occupied",
      deltaLabel: "+4% vs last month",
    },
    openRequests: {
      count: 7,
      summaryLabel: "3 urgent",
      deltaLabel: "2 new today",
    },
  };

  const rentCollection: RentCollection = {
    collected: {
      amountLabel: "$40,250",
      paymentsLabel: "20 payments",
    },
    pending: {
      amountLabel: "$2,550",
      paymentsLabel: "2 payments",
    },
    overdue: {
      amountLabel: "$0",
      paymentsLabel: "0 payments",
    },
  };

  const periodOptions: PeriodOption[] = [
    { label: "November 2024", value: "2024-11" },
    { label: "October 2024", value: "2024-10" },
    { label: "September 2024", value: "2024-09" },
  ];

  const alerts: DashboardAlert[] = [
    {
      id: "1",
      severity: "high",
      title: "Urgent Maintenance",
      description: "Water heater issue at Sunset Apt #304",
      timeAgoLabel: "2 hours ago",
    },
    {
      id: "2",
      severity: "medium",
      title: "Lease Expiring Soon",
      description: "Unit 102 lease ends Dec 31",
      timeAgoLabel: "5 hours ago",
    },
    {
      id: "3",
      severity: "high",
      title: "HVAC Malfunction",
      description: "Heating system down at Pine Plaza #201",
      timeAgoLabel: "1 day ago",
    },
    {
      id: "4",
      severity: "low",
      title: "New Inquiry",
      description: "Prospect interested in Oak Street #2B",
      timeAgoLabel: "3 days ago",
    },
  ];

  const greeting = getTimeBasedGreeting("Landlord");

  return (
    <Dashboard
      greeting={greeting}
      subheadingDateLabel="November 2024"
      overview={overview}
      rentCollection={rentCollection}
      periodOptions={periodOptions}
      currentPeriodValue={currentPeriod}
      onPeriodChange={setCurrentPeriod}
      // rentCollectionChartSlot={<YourChartComponent data={...} />} // later
    />
  );
};

// Simple helper to generate a warm greeting based on the current time
function getTimeBasedGreeting(name?: string): string {
  const hour = new Date().getHours();

  let base = "Welcome back";
  if (hour < 12) base = "Good morning";
  else if (hour < 18) base = "Good afternoon";
  else base = "Good evening";

  return name ? `${base}, ${name} 👋` : `${base} 👋`;
}
