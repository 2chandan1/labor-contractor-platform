import { useState } from "react";
import type { ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
interface UseAuthFormOptions<T> {
    initialData: T;
    validationSchema: z.ZodSchema<any>;
    userRole?: "labour" | "constructors" | "constructor";
    isLogin?: boolean;
}
export function useAuthForm<T extends Record<string, any>>({
    initialData,
    validationSchema,
    userRole,
    isLogin = false,
}: UseAuthFormOptions<T>) {
    // const navigate = useNavigate();
    const [step, setStep] = useState<"form" | "otp" | "login">(
        isLogin ? "login" : "form"
    );
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    // ✅ Handle input change
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field
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
        console.log("passed");
        
        if (!result.success) {
             console.log("failed");
            const errorMap: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                errorMap[issue.path[0] as string] = issue.message;
            });
            setErrors(errorMap);

            // Show first error as toast
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
        if (!validateForm()) {
            return;
        }

        try {
            // TODO: Replace with actual API call
            // await sendOTP(formData.mobile, userRole);

            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("passed in send");
            
            toast.success("OTP sent successfully!");
               return true; 
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
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

    // ✅ OTP Verification Success
    // const handleOtpVerified = async (token: string) => {
    //     try {
    //         // Save token
    //         localStorage.setItem("auth_token", token);

    //         // Prepare user data
    //         const userData = {
    //             mobile: (formData as any).mobile,
    //             name: isLogin ? "Demo User" : (formData as any).name,
    //             role: isLogin ? "labour" : userRole,
    //         };
    //         localStorage.setItem("user_data", JSON.stringify(userData));
    //         toast.success(isLogin ? "Login successful!" : "Registration successful!");
    //         setTimeout(() => {
    //             const dashboardRoute =
    //                 userData.role === "labour"
    //                     ? "/employee/dashboard"
    //                     : "/employer/dashboard";
    //             navigate(dashboardRoute);
    //         }, isLogin ? 1000 : 1000);
    //     } catch (error) {
    //         toast.error(
    //             isLogin
    //                 ? "Login failed. Please try again."
    //                 : "Registration failed. Please try again."
    //         );
    //     }
    // };

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
        // handleOtpVerified,
        handleBackToForm,
        validateForm,
        resetForm,
    };
}