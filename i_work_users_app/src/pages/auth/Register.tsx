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
import { useTranslation } from 'react-i18next';

interface RegisterProps {
  userType?: 'labour' | 'contractor';
  onBack: () => void;
}

const THEME_CONFIG = {
  labour: {
    iconBgColor: 'bg-blue-500',
    buttonColor: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400',
    ringColor: 'focus:ring-blue-500',
    shadow: 'blue',
  },
  contractor: {
    iconBgColor: 'bg-purple-500',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400',
    ringColor: 'focus:ring-purple-500',
    shadow: 'purple',
  }
};

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

export function Register({ userType: propUserType, onBack }:RegisterProps) {
  const { t } = useTranslation();
  const [showOtp, setShowOtp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const userType = (propUserType || localStorage.getItem("userType") || "contractor") as 'labour' | 'contractor';
  const isLabour = userType === "labour";
  const roleLabel = isLabour ? t("register.joinAsLabour") : t("register.joinAsContractor");

  const registerSchema = z.object({
    fullName: z.string().min(3, t("register.validation.fullNameMin")),
    age: z.string().min(1, t("register.validation.ageRequired")).refine((val) => {
      const age = Number(val);
      return age >= 18 && age <= 60;
    }, { message: t("register.validation.ageRange") }),
    gender: z.string().nonempty(t("register.validation.genderRequired")),
    experience: isLabour 
      ? z.string().min(1, t("register.validation.experienceRequired")) 
      : z.string().optional(),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, t("register.validation.invalidMobile")),
    aadhaarCard: z
      .any()
      .refine((val) => val instanceof File, { message: t("register.validation.aadhaarRequired") }),
    address: z.string().min(3, t("register.validation.addressRequired")),
    city: z.string().min(2, t("register.validation.cityRequired")),
    terms: z.literal(true, { errorMap: () => ({ message: t("register.validation.termsRequired") }) })
  });

  const { formData, errors, handleChange, handleSendOtp, handleOtpVerified } = useAuthForm({
    initialData: initialFormData,
    validationSchema: registerSchema,
    userRole: userType,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
     handleChange({ target: { name: "aadhaarCard", value: file } } as any);
    
  };
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const success = await handleSendOtp();
    if (success) {
       setShowOtp(true);
    }
  };

 
  const theme = THEME_CONFIG[userType as 'labour' | 'contractor'];

  return (
    <div className="min-h-[77dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-2 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
      {!showOtp ? (
        <>
          <div className=" w-full max-w-5xl bg-slate-800/40 backdrop-blur-md border border-slate-700/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative z-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors "
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">{t("register.back")}</span>
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-4">
              <div
                className={`sm:w-14 sm:h-14 h-12 w-12 ${theme.iconBgColor} rounded-full flex items-center justify-center shadow-lg shadow-${isLabour ? "blue" : "purple"}-500/30 mb-4`}
              >
                <CheckCircle2 className="sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="sm:text-3xl text-2xl font-extrabold text-white mb-1">
                {roleLabel}
              </h1>
              <p className="text-gray-400 text-center text-sm">{t("register.subtitle")}</p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl w-full mx-auto px-4 sm:px-6"
            >
              {(["fullName", "age", "gender", "experience",  "mobile"]as const).map(
                
                (field) => {
                   if (field === "experience" && !isLabour) return null;
                   return (
                  <div key={field} className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        {t(`register.form.${field}`)}
                      </label>

                      {field === "gender" ? (
                        <select
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">{t("register.form.genderPlaceholder")}</option>
                          <option value="male">{t("register.form.genderMale")}</option>
                          <option value="female">{t("register.form.genderFemale")}</option>
                          <option value="other">{t("register.form.genderOther")}</option>
                        </select>
                      ) : field === "mobile" ? (
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-gray-400 text-sm">+91</span>
                          <input
                            type="tel"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={t("register.form.mobilePlaceholder")}
                            onKeyDown={(e) => {
                              if (!/[0-9]/.test(e.key) && e.key !== "Backspace") e.preventDefault();
                            }}
                            className={`w-full pl-12 sm:pl-14 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
                          />
                        </div>
                      ) : (
                        <input
                          type={field === "age" || field === "experience" ? "number" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={t(`register.form.${field}`)}
                          onKeyDown={(e) => {
                            if (field === "age" || field === "experience") {
                              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                            }
                          }}
                          onInput={(e) => {
                            if (field === "age" || field === "experience") {
                              const input = e.currentTarget;
                              if (Number(input.value) < 0) input.value = "0";
                            }
                          }}
                          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
                        />
                      )}

                      {errors[field] && (
                        <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                      )}
                    </div>
                  );
                }
              )}

              {/* Address */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("register.form.address")}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("register.form.addressPlaceholder")}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* City */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("register.form.city")}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={t("register.form.cityPlaceholder")}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Aadhaar */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">{t("register.form.aadhaar")}</label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="aadhaarCard"
                    className="flex items-center justify-center gap-2 px-4 sm:w-full py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-gray-300 cursor-pointer hover:bg-slate-700 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="sm:text-lg text-sm">{t("register.form.aadhaarUploadButton")}</span>
                  </label>
                  <input
                    id="aadhaarCard"
                    name="aadhaarCard"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
                {errors.aadhaarCard && <p className="text-red-400 text-xs mt-1">{errors.aadhaarCard}</p>}
              </div>

              {/* Terms */}
              <div className="col-span-1 sm:col-span-2 flex flex-col mt-2 space-y-2 sm:space-y-0 text-gray-300">
                <div className="flex items-center space-x-2 mb-2">
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
                    {t("register.form.termsPrefix")}{" "}
                    <span onClick={() => setShowTerms(true)} className="text-blue-400 hover:underline cursor-pointer">
                      {t("register.form.termsLink")}
                    </span>
                  </label>
                </div>
                {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms}</p>}
              </div>

              {/* Submit */}
              <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className={`w-full sm:w-1/2 ${theme.buttonColor} text-white font-semibold py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-${isLabour ? "blue" : "purple"}-500/40`}
                >
                  <span>{t("register.form.sendOtp")}</span>
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
