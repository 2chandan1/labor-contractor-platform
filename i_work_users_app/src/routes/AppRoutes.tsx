import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import HomePage from "../pages/HomePage";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import EmployerDashboard from "../pages/employer/index";
import EmployeeDashboard from "../pages/employee/Index";
import NotFound from "../pages/NotFound";
import { SubscriptionPage } from "../pages/SubscriptionPage.";

export default function AppRoutes() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  return (
    <>
     <div className="flex flex-col  min-h-[100dvh]">
      {/* ✅ Header always visible */}
      <Header
        title="Welcome to i-Work"
        subtitle="Connecting Labourers and Contractors Effortlessly"
      />

      {/* ✅ Routes */}
      <Routes>
        <Route
          path="/"
          element={<HomePage onSelect={setSelectedUserType} />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={
            <Register
              userType={selectedUserType}
              onBack={handleBack}
            />
          }
         
        />
         <Route
          path="/contractor"
          element={
            <EmployerDashboard 
              // onBack={handleBack}
            />
          }
         
        />
         <Route
          path="/subscription"
          element={
            <SubscriptionPage 
              // onBack={handleBack}
            />
          }
         
        />
          <Route path="*" element={<NotFound />} /> 
      </Routes>
      {/* ✅ Footer always visible */}
      <Footer />
      </div>
    </>
  );
}
