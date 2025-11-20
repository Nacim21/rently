// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

// Real pages
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { RentlyLayout } from "./components/layout/RentlyLayout";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import MessagesPage from "./pages/Messages/MessagesPage";



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


//// This func wraps pages that need user to be loged in if no user then it kicks back to login page,  Nacim you wanna do this a global component too? like Ashraful? 
function RequireAuth({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();  //// grab the user from your auth hook
  if (!currentUser) {                 //// if user is null or undefined
    return <Navigate to="/auth/login" replace />; //// push user to login page
  }

  return children; //// if user exist then show the children page normally
}





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