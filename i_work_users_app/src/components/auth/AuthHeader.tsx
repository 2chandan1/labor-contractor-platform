import React from "react";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full text-center py-6 bg-blue-600 text-white rounded-b-2xl shadow-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
    </div>
  );
};

export default AuthHeader;
