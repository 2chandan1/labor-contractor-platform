import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import HomePage from "../pages/HomePage";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

export default function AppRoutes() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  return (
    <>
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
      </Routes>

      {/* ✅ Footer always visible */}
      <Footer />
    </>
  );
}
