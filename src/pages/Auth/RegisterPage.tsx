// al rato la hago
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
import type { UserRole } from "@/lib/auth";

type FormRole = Extract<UserRole, "Tenant" | "Landlord">;

const BENEFITS = [
  "🔥💨 One powerful login for everything — payments, maintenance requests, and communication all in one place",
  "🔥💨 Smart role-aware dashboards built specifically for tenants and landlords",
  "🔥💨 Safe sandbox mode — fully isolated, with a simple mocked CRUD login for worry-free testing",
];
//Smoke porque el CEO es vende humo

export function RegisterPage() {
  const [name, setName] = useState("");

  // this is the most basic submit handler, no auth yet
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("trying to register user:", name); // later we call registerUser
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account (v1 minimal)</CardTitle>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex. Maria Lopez"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
