// src\pages\Auth\RegisterPage.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import type { UserRole } from "@/lib/auth";

type FormRole = Extract<UserRole, "Tenant" | "Landlord">;

const BENEFITS = [
  "🔥💨 One powerful login for everything — payments, maintenance requests, and communication all in one place",
  "🔥💨 Smart role-aware dashboards built specifically for tenants and landlords",
  "🔥💨 Safe sandbox mode — fully isolated, with a simple mocked CRUD login for worry-free testing",
];
//Smoke porque el CEO es vende humo
export function RegisterPage() {
 
  const [role, setRole] = useState<FormRole>("Tenant");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
   
  const onSubmit = (event: FormEvent) => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // pretend we hit the backend here; for now just log the payload
    console.log("register payload", {
      role,
      fullName,
      email,
      password,
      company,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-slate-900" />
            <span className="text-xl font-semibold text-slate-900">Rently</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/">Back to app</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center px-6 py-12">
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
                This is a mock registration for our CRUD-only demo. We just need a few details to spin up your sandbox. Passwords
                are plain strings coming from the backend, so no auth headaches here.
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
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company / Property name</label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Create account
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
  );
}
