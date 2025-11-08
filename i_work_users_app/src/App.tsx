import { useState } from "react";
import  Index from "./pages/Index";
import { Register } from "./pages/auth/Register";
import {Login} from "./pages/auth/Login";

export default function App() {
  const [currentPage, setCurrentPage] = useState('index'); // Start with 'login'
  const [selectedUserType, setSelectedUserType] = useState(null); // 'labour' or 'contractor'

  // Navigate to Index (selection page) from Login
  const handleNavigateToSignup = () => {
    setCurrentPage('index');
  };

  // Navigate to Register after selecting user type
  const handleSelect = (type) => {
    setSelectedUserType(type);
    setCurrentPage('register');
  };

  // Go back from Register to Index
  const handleBackToSelection = () => {
    setCurrentPage('index');
    setSelectedUserType(null);
  };

  // Go back from Index to Login
  const handleBackToLogin = () => {
    setCurrentPage('login');
    setSelectedUserType(null);
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login onNavigateToSignup={handleNavigateToSignup} />
      )}
      {currentPage === 'index' && (
        <Index 
          onSelect={handleSelect} 
          onNavigateToLogin={handleBackToLogin} 
        />
      )}
      {currentPage === 'register' && (
        <Register 
          userType={selectedUserType} 
          onBack={handleBackToSelection} 
        />
      )}
    </>
  );
}