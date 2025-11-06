// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import MainLayout from "./layout/MainLayout";
// import EmployerDashboard from "./pages/employer/Dashboard";
// import EmployeeDashboard from "./pages/employee/Dashboard";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route element={<MainLayout />}>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/employer/dashboard" element={<EmployerDashboard/>}/>
//         <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
