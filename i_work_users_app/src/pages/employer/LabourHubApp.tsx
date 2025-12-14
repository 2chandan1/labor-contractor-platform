// src/LaborHubApp.tsx (Main file)
import React from 'react';
import { ContractorPage } from './pages/ContractorPage';
import { LaborerPage } from './pages/LaborerPage';
// Assume all other imports (types, data) are handled in the component files

export default function LaborHubApp({ userRole }: { userRole: 'laborer' | 'contractor' }) {
  
  // 

  if (userRole === 'contractor') {
    return <ContractorPage />;
  } else if (userRole === 'laborer') {
    return <LaborerPage />;
  } else {
    // Fallback or a dedicated login/onboarding screen
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Error: User Role Not Defined</h1>
      </div>
    );
  }
}

// Example usage outside of this file:
// render(<LaborHubApp userRole="laborer" />); 
// render(<LaborHubApp userRole="contractor" />);