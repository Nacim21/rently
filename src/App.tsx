// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RentlyLayout } from "./components/layout/RentlyLayout";


// Real pages
import PaymentsPage from "./pages/Payments/PaymentsPage";
// 
// TODO: import these when you build them:
// import MaintenancePage from "./pages/Maintenance/Maintenance";
// import DashboardPage from "./pages/Dashboard/DashboardPage";
// import PropertiesPage from "./pages/Properties/PropertiesPage";
// import MessagesPage from "./pages/Messages/MessagesPage";

// TEMPORARY placeholders  
function DashboardPlaceholder() {
  return <div>Dashboard content</div>;
}
function PropertiesPlaceholder() {
  return <div>Properties content</div>;
}
function MessagesPlaceholder() {
  return <div>Messages content</div>;
}
function MaintanencePlaceholder() {
  return <div>Maintanence Placeholder</div>;
}

// These are placeholder components for the respective pages. In the final implementation, they would be imported from their respective files.

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RentlyLayout role="Landlord" />}>
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Nested route paths MUST NOT start with "/" */}
        <Route path="dashboard" element={<DashboardPlaceholder />} />
        <Route path="properties" element={<PropertiesPlaceholder />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="maintenance" element={<MaintanencePlaceholder/>} />
        <Route path="messages" element={<MessagesPlaceholder />} />
      </Route>
    </Routes>
  );
}