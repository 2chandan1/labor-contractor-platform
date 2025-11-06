import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layout/MainLayout";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard/>}/>
        <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
