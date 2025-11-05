import React, { useState } from "react";
import AuthHeader from "../../components/auth/AuthHeader";
import MobileInput from "../../components/auth/MobileInput";
import OtpInput from "../../components/auth/OtpInput";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleSendOtp = () => setStep(2);
  const handleVerifyOtp = () => alert("Logged in successfully!");
  const handleResend = () => alert("OTP Resent!");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <AuthHeader title="Login" subtitle="Welcome back!" />
      <div className="mt-10 w-full flex justify-center px-4">
        {step === 1 ? (
          <MobileInput onSendOtp={handleSendOtp} />
        ) : (
          <OtpInput onVerifyOtp={handleVerifyOtp} onResend={handleResend} />
        )}
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
