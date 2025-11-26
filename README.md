# Commands to clone and run
- git clone https://github.com/Nacim21/rently
- cd rently
- npm install
- npm run dev


> Note: Keep the Django server running in another terminal. Open another terminal 
>
> ```bash
> # in terminal B (keep running)
> python manage.py runserver
 


# Rently Frontend Guide (React + shadcn/ui + tailwind)

A beginner-friendly development guide for the Rently frontend.  
This document ensures everyone follows the same structure, conventions, and UI patterns across the project.

---

## 1. Project Structure

We use a clean, predictable folder layout:

```
src/
  app/                  # App entry and routing
  pages/                # Page-level components (screens)
    Dashboard/
      DashboardPage.tsx
      components/
    Leases/
      LeasesPage.tsx
      components/
    Payments/
      PaymentsPage.tsx
      components/
    Maintenance/
      MaintenancePage.tsx
      components/
    Auth/
      LoginPage.tsx
      RegisterPage.tsx
  components/
    layout/             # AppShell, Sidebar, Header, etc.
    ui/                 # shadcn components
  features/             # Domain logic and shared components
  hooks/                # Generic reusable hooks
  lib/                  # Helpers, formatters, constants
```

### Rules

- Components used in one page → place them in that page’s `components/`.
- Reusable/shared components → `src/components/`.
- Domain‑specific shared components → `src/features/<domain>/`.

---

## 2. Naming Conventions

- **PascalCase** for components (`LeaseTable`, `PaymentCard`)
- **One component per file** (file name = component name)
- **Page components** end with `Page` (e.g., `DashboardPage`)

Example:

```tsx
// src/pages/Payments/PaymentsPage.tsx
export function PaymentsPage() {
  return <div>Payments</div>;
}
```

---

## 3. Using shadcn/ui Components

We rely on shadcn/ui for consistent UI. Prefer these components over raw HTML:

- Button
- Input
- Label
- Card
- Table
- Badge
- Dialog
- Tabs
- Select
- DropdownMenu
- https://ui.shadcn.com/components To browse the entire collection

To add components not yet installed on the project run the following command
```bash
npx shadcn@latest add <componentname>
```

### Example: Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function NextPaymentCard({ amount, dueDate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Next Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">${amount}</p>
        <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
      </CardContent>
    </Card>
  );
}
```

---

## 4. Creating a New Page

### Step 1 — Create the Folder

```
src/pages/Maintenance/
```

### Step 2 — Create `MaintenancePage.tsx`

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaintenanceTable } from "./components/MaintenanceTable";

export function MaintenancePage() {
  const requests = [
    { id: 1, title: "Leaky faucet", status: "New" },
    { id: 2, title: "AC not working", status: "In Progress" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Maintenance Requests
        </h1>
        <Button>New Request</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceTable requests={requests} />
        </CardContent>
      </Card>
    </div>
  );
}
```

### Step 3 — Add `MaintenanceTable.tsx`

```tsx
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function MaintenanceTable({ requests }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.id}</TableCell>
            <TableCell>{r.title}</TableCell>
            <TableCell>
              <Badge>{r.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## 5. Layout & AppShell

All logged‑in pages use a common layout:

```tsx
// src/components/layout/AppShell.tsx
import { Sidebar } from "./Sidebar";

export function AppShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 py-6 bg-muted/30">{children}</main>
    </div>
  );
}
```

---

## 6. State & Data (Beginner Version)

Use simple React state until backend integration:

```tsx
const [payments, setPayments] = useState([]);

useEffect(() => {
  setPayments([
    { id: 1, amount: 500, status: "Paid" },
    { id: 2, amount: 750, status: "Pending" },
  ]);
}, []);
```

Later we’ll migrate to custom hooks.

---

## 7. Tailwind Styling Rules

Use utility classes for layout and spacing:

- `space-y-4`
- `p-6`
- `flex items-center justify-between`
- `text-2xl font-semibold`
- `text-muted-foreground`

Example:

```tsx
<div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-semibold tracking-tight">Leases</h1>
  <Button>New Lease</Button>
</div>
```

---

## 8. Rently UX Patterns

### Dashboards  
- Cards at the top  
- Tables below  
- Main actions on the top-right  

### Forms  
- `Label` + `Input` pairs  
- Group fields with `space-y-4`  

### Status Indicators  
Use `Badge` for statuses like:

- `Paid`, `Pending`, `Overdue`
- `New`, `In Progress`, `Completed`

---

## 9. Code Review Checklist

Before merging:

```
[ ] File is in the correct folder
[ ] Using shadcn/ui components
[ ] Page styling matches existing pages
[ ] Component has clear naming
[ ] No unnecessary duplication
[ ] Component is small and focused
```

---

If you need help with setup or structure, ask anytime.
