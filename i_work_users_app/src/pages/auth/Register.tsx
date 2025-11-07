import React, { useState } from 'react';
import { Users, Briefcase, ChevronRight, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
export function Register({ userType, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    experience: '',
    location: '',
    mobile: '+91'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('OTP sent successfully!');
  };

  const isLabour = userType === 'labour';
  const iconBgColor = isLabour ? 'bg-blue-500' : 'bg-purple-500';
  const buttonColor = isLabour ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/50' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/50';
  const ringColor = isLabour ? 'focus:ring-blue-500' : 'focus:ring-purple-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back</span>
        </button>

        {/* Register Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4`}>
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Join as {isLabour ? 'Labour' : 'Contractor'}
            </h1>
            <p className="text-gray-400 text-center">
              Build your professional profile and connect with opportunities
            </p>
          </div>

          {/* Register Inputs */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all`}
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="28"
                    className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-400 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all appearance-none cursor-pointer`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience (years)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="5"
                    className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="New Delhi"
                  className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all`}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={`w-full ${buttonColor} text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg mt-8`}
            >
              <span>Send OTP</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}