//  login super simple, lets keep in mind that due to lack of time we will ony keep track of name and role
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { UserRole } from "@/lib/auth"; // using the type of  role from the auth


// fixed list of roles que that we will use as buttons
const roles: UserRole[] = ["Landlord", "Tenant"];


export function LoginPage() {
   const navigate = useNavigate();
   const { login } = useAuth(); // auth hook

  // storing name 
  const [name, setName] = useState("");

  // basic handler for submit, this is not conected to auth yet 
  const [role, setRole] = useState<UserRole>("Landlord");0

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    // old error before trying to login again
    setError(null);

    // we call the login function from context
    const result = login(name, role);

    if (result.success) {
      // if it succeed it will lead to dashboard
      navigate("/dashboard", { replace: true });
      return;
    }

    // if didnt succeed, it will show the message
    setError(result.message ?? "Unable to login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-md px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Login Rently (v1 super simple)
            </CardTitle>
          </CardHeader>

          {/* form sencillito with an input and a button */}
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej. Cesar Tirado"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
