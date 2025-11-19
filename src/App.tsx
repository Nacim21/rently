// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RentlyLayout } from "./components/layout/RentlyLayout";

// Real pages
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import MessagesPage from "./pages/messages/MessagesPage";


// 
// TODO: import these when you build them:
// import MaintenancePage from "./pages/Maintenance/Maintenance";
// import PropertiesPage from "./pages/Properties/PropertiesPage";

// TEMPORARY placeholders  
function PropertiesPlaceholder() {
  return <div>Properties content</div>;
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
        <Route path="dashboard" element={<DashboardPage/>} />
        <Route path="properties" element={<PropertiesPlaceholder />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="maintenance" element={<MaintanencePlaceholder/>} />
        <Route path="messages" element={<MessagesPage/>} />
      </Route>
    </Routes>
  );
}