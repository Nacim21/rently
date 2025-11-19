// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RentlyLayout } from "./components/layout/RentlyLayout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";


function PropertiesPage() {
  return <div>Properties content</div>;
}
function PaymentsPage() {
  return <div>Payments content</div>;
}
function MaintenancePage() {
  return <div>Maintenance content</div>;
}
function MessagesPage() {
  return <div>Messages content</div>;
}

// These are placeholder components for the respective pages. In the final implementation, they would be imported from their respective files.

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RentlyLayout role="Landlord" />}>

        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Route>
    </Routes>
  );
}
