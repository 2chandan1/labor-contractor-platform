import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "../pages/Index";
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";
import { useState } from "react";

export default function AppRoutes() {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route 
        path="/" 
        element={<Index onSelect={setSelectedUserType} />} 
      />

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
  );
}
