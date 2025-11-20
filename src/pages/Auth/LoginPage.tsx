import { FormEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, X, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

const FEATURES = [
  {
    title: "Rent Tracking",
    description:
      "Automatic payment reminders, online payments, and complete payment history at your fingertips.",
  },
  {
    title: "Maintenance Requests",
    description:
      "Submit, track, and resolve maintenance issues with photo uploads and real-time status updates.",
  },
  {
    title: "Direct Communication",
    description:
      "Built-in messaging system keeps all conversations organized and accessible.",
  },
  {
    title: "Financial Insights",
    description:
      "Visual dashboards and reports help landlords understand their portfolio performance.",
  },
  {
    title: "Secure & Reliable",
    description:
      "Bank-level encryption and automatic backups keep your data safe and accessible.",
  },
  {
    title: "Multi-Property Support",
    description:
      "Manage multiple properties and units from a single, intuitive dashboard.",
  },
];

type FormRole = Extract<UserRole, "Tenant" | "Landlord">;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formRole, setFormRole] = useState<FormRole | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  // focus username when the overlay opens
  useEffect(() => {
    if (formRole && usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, [formRole]);

  const openForm = (role: FormRole) => {
    setFormRole(role);
    setUsername("");
    setPassword("");
    setError(null);
  };

  const closeForm = () => {
    setFormRole(null);
    setUsername("");
    setPassword("");
    setError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formRole) return;

    setIsSubmitting(true);
    const result = login(username, password, formRole);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/dashboard", { replace: true });
      return;
    }

    setError(result.message ?? "Unable to login");
  };

  const heroSubtitle =
    "Streamline rent collection, track maintenance, and communicate seamlessly. Built for tenants, landlords, and property managers.";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Login overlay */}
      {formRole && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-200">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5 text-slate-600" />
                  <span>
                    Login as {formRole === "Tenant" ? "Tenant" : "Landlord"}
                  </span>
                </CardTitle>
                <CardDescription className="mt-1">
                  Enter your username and password to access your dashboard.
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close login form"
              >
                <X className="h-4 w-4" />
              </button>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* simple image placeholder per login type */}
                <div className="mb-2 flex h-24 w-full items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
                  {formRole === "Tenant"
                    ? "Tenant login image placeholder"
                    : "Landlord login image placeholder"}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Username
                  </label>
                  <Input
                    ref={usernameInputRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Juan"
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-red-600">{error}</p>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* main landing layout */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        {/* top nav */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-sky-600" />
            <span className="text-base font-semibold text-slate-900">
              Rently
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openForm("Landlord")}
            >
              Login
            </Button>
            <Button size="sm" onClick={() => openForm("Landlord")}>
              Get Started
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          {/* hero */}
          <section className="pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
            <div className="mx-auto max-w-3xl space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Manage your rental life{" "}
                <span className="block text-sky-600">in one place</span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
                {heroSubtitle}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => openForm("Tenant")}
                  className="px-6"
                >
                  Login as Tenant
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openForm("Landlord")}
                  className="px-6"
                >
                  Login as Landlord
                </Button>
              </div>
            </div>
          </section>

          {/* features grid */}
          <section className="pb-16">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* big CTA block */}
          <section className="mt-auto pb-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-sky-600 px-6 py-10 text-center text-slate-50 shadow-md">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Ready to simplify your rental management?
              </h2>
              <p className="mt-2 text-sm text-sky-100 sm:text-base">
                Join thousands of landlords and tenants who trust Rently.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-6"
                  onClick={() => openForm("Landlord")}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* footer */}
        <footer className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Rently. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
