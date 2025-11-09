import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function Login({ onNavigateToSignup }) {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mobile number:', mobileNumber);
    alert('Continuing with mobile number: ' + mobileNumber);
  };

  return (
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
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50 mb-6"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secure Login Text */}
          <div className="text-center mb-4">
            <p className="text-gray-500 text-sm">Secure Login</p>
          </div>

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
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </button>
          </p>
        </div>
      </div>

      
    </div>
  );
}