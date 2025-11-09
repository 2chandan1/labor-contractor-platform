import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import TermsandCondition from '@/components/auth/TermsandCondition';
import { z } from "zod";
import { useAuthForm } from '@/hooks/useAuth';
import OTPVerification from '@/components/auth/OtpVerification';
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
  } = useAuthForm({
    initialData: initialFormData,
    validationSchema: mobileSchema,
    isLogin: true,
  });
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = async () => {
    const success = await handleSendOtp();
    if (success){
      setIsOtpSent(true);
      setShowOtp(true);
    } 
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700/50">
            {/* Phone Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Phone className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">
                Enter your mobile number to continue
              </p>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                value={formData.mobile}
                name="mobile"
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
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
              disabled={isOtpSent}
             className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 
                hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 
                rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg 
                hover:shadow-blue-500/50 mb-6 ${
                  isOtpSent ? "opacity-50 cursor-not-allowed" : ""
                }`} >
              <span>{isOtpSent ? "OTP Sent" : "Send OTP"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Secure Login Text */}
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">Secure Login</p>
            </div>
               {showOtp && (
      
        
        <div className="mt-8 flex justify-center">
          <OTPVerification
            mobileNumber={formData.mobile}
            onVerifySuccess={(token) => {
              console.log("OTP verified:", token);
              // you can navigate or handle auth success here
            }}
            onResendOtp={async () => {
              await handleSendOtp();
            }}
            onBack={() => setShowOtp(false)}
          />
        </div>
      )}
            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button 
                  onClick={()=>navigate("/")}
                  className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Terms Text */}
        <TermsandCondition />
        </div>

        
      
     
</div>
    </>
  );
}