// RentlyLayout.tsx
import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Building2,
  CreditCard,
  Wrench,
  MessageCircle,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type RentlyLayoutProps = {
  role?: "Landlord" | "Tenant";
  userName?: string;
  onLogout?: () => void;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Messages", href: "/messages", icon: MessageCircle },
];

export const RentlyLayout: React.FC<RentlyLayoutProps> = ({
  role = "Landlord",
}) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                <Home className="h-4 w-4 text-primary" />
              </span>
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                Rently
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    location.pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm font-medium transition-all",
                      "text-slate-500 hover:text-slate-900 hover:border-slate-200",
                      isActive && "text-primary border-primary bg-primary/5"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
            >
              {role}
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => console.log("logout clicked")}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
