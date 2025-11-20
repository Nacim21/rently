// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

// Real pages
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { RentlyLayout } from "./components/layout/RentlyLayout";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import MessagesPage from "./pages/messages/MessagesPage";
import { useAuth } from "./lib/auth";
import type { JSX } from "react";


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
  const { currentUser, logout } = useAuth() //// for showing name and logout inside layout

  return (
    <Routes>

      {/* public area only for auth stuff no login needed */}
      <Route path="/auth">
        <Route index element={<Navigate to="login" replace />} /> {/* always send to login first */}
        <Route path="login" element={<LoginPage />} />            {/* login screen */}
        <Route path="register" element={<RegisterPage />} />      {/* register screen */}
      </Route>

      {/* this whole block below is protected by RequireAuth */}
      <Route
        path="/"
        element={
          <RequireAuth>  {/* block access unless user logged in */}

            {/* main layout shell for logged in users */}
            <RentlyLayout
              role={currentUser?.role ?? "Landlord"}  //// show user role if have one or fallback
              userName={currentUser?.name}            //// display username inside layout
              onLogout={logout}                       //// logout button triggers this
            />

          </RequireAuth>
        }
      >

        {/* when visiting "/" redirect to dashboard inside the layout */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* nested pages below here must not start with slash or router freaks out */}
        <Route path="dashboard" element={<DashboardPage/>} />
        <Route path="properties" element={<PropertiesPlaceholder />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="maintenance" element={<MaintanencePlaceholder />} />
        <Route path="messages" element={<MessagesPage />} />

      </Route>

      {/* fallback if someone goes to unknown route just send home */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}