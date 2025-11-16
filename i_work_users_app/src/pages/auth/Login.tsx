import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthForm } from '../../hooks/useAuth';
import OTPVerification from '../../components/auth/OtpVerification';
import { useState } from 'react';
const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});
const initialFormData = { mobile: "" };

export function Login() {
  const {
    formData,
    errors,
    handleChange,
    handleSendOtp,
     handleOtpVerified
  } = useAuthForm({
    initialData: initialFormData,
    validationSchema: mobileSchema,
    isLogin: true,
  });
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const handleSubmit = async () => {
    const success = await handleSendOtp();
    if (success){
      setShowOtp(true);
    } 
  };

  return (
   <div className="p-6 w-full  min-h-[77dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-150" />
      </div>

      {!showOtp ? (
      <div className="relative z-10 w-full max-w-md bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] transition-transform  hover:shadow-blue-500/30">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="sm:w-20 sm:h-20 w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
            <Phone className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="sm:text-3xl text-xl font-bold text-white mb-2 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your mobile number to continue
          </p>
        </div>
        <div className="mb-6">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
              +91
            </span>
            <input
              type="tel"
              value={formData.mobile}
              name="mobile"
              onChange={handleChange}
              placeholder="Enter mobile number"
              className={`w-full pl-20 pr-4 py-4 bg-slate-700/50 border rounded-xl text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-600 focus:ring-blue-500"
                }`}
            />
          </div>
          {errors.mobile && (
            <p className="text-red-400 text-sm mt-2">{errors.mobile}</p>
          )}
        </div>
        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className={`w-full py-4 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 mb-6 
            ${ "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.4)] text-white"
            }`}
        >
          <span> Send OTP</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        {/* Secure Login */}
        <p className="text-center text-gray-500 text-sm mb-4">Secure Login</p>

        {/* Sign Up */}
        <div className="text-center pt-4 border-t border-slate-700">
          <p className="text-gray-400 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors"
            >
              Sign Up
            </button>
          </p>
      </div>       
       </div>
      ) : (
        
      <div className="flex flex-col sm:max-w-md max-w-sm p-9">
            <OTPVerification
              mobileNumber={formData.mobile}
              onVerifySuccess={handleOtpVerified}
              onResendOtp={async () => { await handleSendOtp(); }}
              onBack={() => {setShowOtp(false);}}
            />
        </div>
      )}
    </div>
  );
}
