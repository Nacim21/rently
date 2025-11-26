import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Home, Lock, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

//imports for GlassGrid. Nacim do not get mad, it looks so cool
import { GlassGrid } from "@/components/GlassGrid";

const REGISTER_IMAGES = Object.entries(registerImageModules).map(
  ([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const label = fileName
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[-_]/g, " "); // nicer label

    return {
      src: url as string,
      label,
    };
  }
);

 

const BENEFITS = [
  "One login for payments, maintenance, and messages",
  "Role-aware dashboards for tenants and landlords",
  "Safe sandbox: we only mock a simple CRUD login",
];

const registerImageModules = import.meta.glob<
  string
>("../../assets/register/*.{png,jpg,jpeg,webp}", {
  eager: true,
  as: "url",
});

type FormRole = Extract<UserRole, "Tenant" | "Landlord">;

 
export function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [role, setRole] = useState<FormRole>("Tenant");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await registerUser(fullName, password, role);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/auth/login", { replace: true });
      return;
    }

    setError(result.message ?? "Unable to register. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Home className="h-5 w-5 text-sky-600" />
            <span className="text-base font-semibold">Rently</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/">Back to app</Link>
            </Button>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
              <UserPlus className="h-4 w-4" />
              Create your workspace access
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Register for your Rently account
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                This is a mock registration for our CRUD-only demo. Your details go straight to the demo API and we send you
                back to login—no real auth or emails involved.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* 👉 NEW: glassmorphic grid with all images in src/assets/register */}
            <div className="mt-4 rounded-3xl bg-sky-50/40 p-2 sm:p-3">
              <GlassGrid images={REGISTER_IMAGES} />
            </div>

          </section>

          <section>
            <Card className="w-full shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5 text-slate-600" />
                  Create account
                </CardTitle>
                <CardDescription className="text-sm text-slate-600">
                  Pick your role, add your info, and we will hand you back to the login screen.
                </CardDescription>
              </CardHeader>

              <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Role</label>
                    <Select value={role} onValueChange={(value) => setRole(value as FormRole)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tenant">Tenant</SelectItem>
                        <SelectItem value="Landlord">Landlord</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full name</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex. Maria Lopez"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Plain string from backend"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  {error && (
                    <p className="text-sm font-medium text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create account"}
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    Already have an account? {" "}
                    <Link to="/auth/login" className="text-sky-600 hover:text-sky-700">
                      Go to login
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}