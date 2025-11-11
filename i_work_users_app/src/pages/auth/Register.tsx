import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
} from "lucide-react";
import { z } from "zod";

import { useState } from "react";
import TermsandCondition from "../../components/auth/TermsandCondition";
import OTPVerification from "../../components/auth/OtpVerification";
import { useAuthForm } from "../../hooks/useAuth";
const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  age: z.string().min(1, "Age is required").refine((val) => {
    const age = Number(val);
    return age >= 18 && age <= 60;
  },
    { message: "Age must be between 18 and 60" }
  ),
  gender: z.string().nonempty("Please select gender"),
  experience: z.string().min(1, "Experience is required"),
  
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  aadhaarCard: z
    .string()
    .min(1, "Please upload your Aadhaar card image"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the Terms & Conditions" }),
  })
});

const initialFormData = {
  fullName: "",
  age: "",
  gender: "",
  experience: "",
  location: "",
  mobile: "",
  aadhaarCard: "",
  address: "", 
  city: "", 
  terms: false,
};

export function Register({ userType: propUserType, onBack }) {
  const [showOtp, setShowOtp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);
  const userType = propUserType || localStorage.getItem("userType") || "contractor";

  const { formData, errors, handleChange, handleSendOtp,handleOtpVerified  } = useAuthForm({
    initialData: initialFormData,
    validationSchema: registerSchema,
    userRole: userType,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange({
        target: { name: "aadhaarCard", value: reader.result as string },
      } as any);
    };
    reader.readAsDataURL(file); // Converts image → Base64
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSendOtp();
    if (success) {
       setShowOtp(true);
    }
  };

  const isLabour = userType === "labour";
  const iconBgColor = isLabour ? "bg-blue-500" : "bg-purple-500";
  const buttonColor = isLabour
    ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
    : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400";
  const ringColor = isLabour ? "focus:ring-blue-500" : "focus:ring-purple-500";

  return (
    <div className="min-h-[77dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-2 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
      {!showOtp ? (
        <>
          <div className=" w-full max-w-5xl bg-slate-800/40 backdrop-blur-md border border-slate-700/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative z-10">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors "
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-4">
              <div
                className={`sm:w-14 sm:h-14 h-12 w-12 ${iconBgColor} rounded-full flex items-center justify-center shadow-lg shadow-${isLabour ? "blue" : "purple"}-500/30 mb-4`}
              >
                <CheckCircle2 className="sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="sm:text-3xl text-2xl font-extrabold text-white mb-1">
                Join as {isLabour ? "Labour" : "Contractor"}
              </h1>
              <p className="text-gray-400 text-center text-sm">
                Create your profile and start connecting instantly
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl w-full mx-auto px-4 sm:px-6"
            >
              {["fullName", "age", "gender", "experience",  "mobile"].map(
                (field) => (
                  <div key={field} className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                      {field === "fullName"
                        ? "Full Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>

                    {field === "gender" ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 ${ringColor} transition-all appearance-none cursor-pointer`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : field === "mobile" ? (
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-gray-400 text-sm">+91</span>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className={`w-full pl-12 sm:pl-14 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} transition-all`}
                          />
                        </div> ):(
                      <input
                        type={
                          field === "age" || field === "experience" ? "number" : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Enter ${field}`}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} transition-all`}
                      />
                    )}

                    {errors[field] && (
                      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                    )}
                  </div>
                )
              )}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, Building..."
                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} transition-all`}
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                     className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${ringColor} transition-all`}
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* ✅ Aadhaar Card Upload */}
                <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aadhaar Card 
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="aadhaarCard"
                    className="flex items-center justify-center gap-2 px-4 sm:w-full py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-gray-300 cursor-pointer hover:bg-slate-700 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="sm:text-lg text-sm">Upload Image</span>
                  </label>
                  <input
                    id="aadhaarCard"
                    name="aadhaarCard"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                     className="block w-full text-sm text-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-500"
                  />
                  {aadhaarPreview && (
                    <img
                      src={aadhaarPreview}
                      alt="Aadhaar Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-slate-600"
                    />
                  )}
                </div>
                {errors.aadhaarCard && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.aadhaarCard}
                  </p>
                )}
              </div>
              {/* ✅ Terms & Conditions */}
              <div className="col-span-1 sm:col-span-2 flex flex-col mt-2 space-y-2 sm:space-y-0  text-gray-300">
                <div className="flex  items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms}
                    onChange={(e) =>
                      handleChange({ target: { name: "terms", value: e.target.checked } })
                    }
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm leading-tight">
                    I agree to the{" "}
                    <span onClick={() => setShowTerms(true)} className="text-blue-400 hover:underline cursor-pointer">
                      Terms & Conditions
                    </span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.terms}
                  </p>
                )}
              </div>


              {/* ✅ Submit Button */}
              <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className={`w-full sm:w-1/2 ${buttonColor} text-white font-semibold py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-${isLabour ? "blue" : "purple"
                    }-500/40 `}
                >
                  <span>Send OTP</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

          </div>
          <TermsandCondition open={showTerms} onClose={() => setShowTerms(false)} />
        </>
      ) : (
        <div className="flex flex-col sm:max-w-md max-w-sm p-9">
          <OTPVerification
            mobileNumber={formData.mobile}
            onVerifySuccess={handleOtpVerified}
            onResendOtp={async () => {
              await handleSendOtp();
            }}
            onBack={() => {
              setShowOtp(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
