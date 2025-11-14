import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import axiosInstance from "../services/api/axios.config";
import { STORAGE_KEYS } from "../utils/constants";
interface UseAuthFormOptions<T> {
    initialData: T;
    validationSchema: z.ZodSchema<any>;
    userRole?: "labour"  | "contractor";
    isLogin?: boolean;
}
export function useAuthForm<T extends Record<string, any>>({
    initialData,
    validationSchema,
    userRole,
    isLogin = false,
}: UseAuthFormOptions<T>) {
    const navigate = useNavigate();
    const [step, setStep] = useState<"form" | "otp" | "login">(
        isLogin ? "login" : "form"
    );
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleChange = (
            e:| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | { target: { name: string; value: any } }
        ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // ✅ Validate form
    const validateForm = (): boolean => {
        const result = validationSchema.safeParse(formData);
        if (!result.success) {
             console.log("failed");
            const errorMap: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                errorMap[issue.path[0] as string] = issue.message;
            });
            setErrors(errorMap);
            const firstError = Object.values(errorMap)[0];
            if (firstError) {
                toast.error(firstError);
            }
            return false;
        }
        setErrors({});
        return true;
    };

    // ✅ Send OTP
    const handleSendOtp = async () => {
        if (!validateForm()) return;
        const mobileNumber=formData.mobile
        const checkRes = await axiosInstance.post("/auth/check-user", {
             mobileNumber
        });
        const exists = checkRes.data?.exists;

        if(isLogin && !exists){
            toast.error("User Does not exists , Please register first");
            return;
        }
        if(!isLogin && exists){
            toast.error("User Already exists");
            return;
        }
        try {
            //MSG91 API CALL FOR SEND OTP
            const response= await axiosInstance.post('/auth/send-otp',{
                mobileNumber
            })
            if(response.data.success){
                toast.success("OTP sent successfully!");
               return true; 
            }
            toast.error("Failed to send OTP. Please try again.");
            return false;
        } catch (error) {
            const errorMessage =  "Failed to send OTP. Please try again.";
            toast.error(errorMessage);
            return false;
        }
    };

    // ✅ Resend OTP
    const handleResendOtp = async () => {
        try {
            // TODO: Replace with actual API call
            // await resendOTP(formData.mobile, userRole);

            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("OTP resent successfully!");
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    const handleOtpVerified = async (verifyResponse: any) => {
        try {
            const {isExistingUser, token, user} =verifyResponse;
            if(isExistingUser){
                localStorage.setItem(STORAGE_KEYS.TOKEN, token);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                window.dispatchEvent(new Event("login-status-changed"));
                toast.success("Login successful!");
                const dashboardRoute =user.role === "labour" ? "/labour" : "/contractor";
                setTimeout(() => navigate(dashboardRoute),1000);
                return;
            }    
            // Create FormData
            const formDataToSend = new FormData();
            formDataToSend.append("mobileNumber", formData.mobile);
            formDataToSend.append("role", userRole!);
            formDataToSend.append("fullName", formData.fullName);
            formDataToSend.append("age", String(formData.age));
            formDataToSend.append("gender", formData.gender);
            if(userRole === "labour") {
                formDataToSend.append("experience", String(formData.experience));
            }
            formDataToSend.append("address", formData.address);
            formDataToSend.append("city", formData.city);
            formDataToSend.append("termsAndCondition",formData.terms);
            formDataToSend.append("aadhaarCard", formData.aadhaarCard);

            //Register API
            const response = await axiosInstance.post("/auth/register", formDataToSend, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
            window.dispatchEvent(new Event("login-status-changed"));
            toast.success("Registration successful!");
            const dashboardRoute =userRole === "labour" ? "/labour" : "/contractor";
            setTimeout(() => navigate(dashboardRoute), 1000);
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const handleBackToForm = () => {
        setStep(isLogin ? "login" : "form");
    };

    const resetForm = () => {
        setFormData(initialData);
        setErrors({});
        setStep(isLogin ? "login" : "form");
    };
    return {
        step,
        formData,
        errors,
        setStep,
        setFormData,
        setErrors,
        handleChange,
        handleSendOtp,
        handleResendOtp,
        handleOtpVerified,
        handleBackToForm,
        validateForm,
        resetForm,
    };
}