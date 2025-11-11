import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import axiosInstance from "../services/api/axios.config";
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
    //             const userData = {
    //                     mobileNumber: formData.mobile, // backend expects 'mobileNumber'
    //                     role: userRole, // 'labour' or 'contractor'
    //                     fullName: formData.fullName,
    //                     age: formData.age,
    //                     gender: formData.gender,
    //                     experience: formData.experience,
    //                     address: formData.address,
    //                     city: formData.city,
    //                     state: formData.state,
    //                     pincode: formData.pincode,
    //                     aadhaarCard: formData.aadhaarCard,
    //                     };
    //                     const response = await axiosInstance.post('/users/register', userData);
    //         // Prepare user data
    //         // const userData = {
    //         //     ...formData,
    //         //     mobile: (formData as any).mobile,
    //         //     name: isLogin ? "Demo User" : (formData as any).name,
    //         //     role: isLogin ? "labour" : userRole,
    //         // };
    //         console.log("userData",response.data.user);
            
    //         localStorage.setItem("user_data", JSON.stringify(response.data.user));
    //         toast.success(isLogin ? "Login successful!" : "Registration successful!");
    //         setTimeout(() => {
    //             const dashboardRoute =
    //                 userData.role === "labour"
    //                     ? "/laboour"
    //                     : "/contractor";
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
const handleOtpVerified = async (token: string) => {
    try {
        // Save token
        localStorage.setItem("auth_token", token);
        console.log("formData",formData);
        
        // Create FormData
        const formDataToSend = new FormData();
        formDataToSend.append("mobileNumber", formData.mobile);
        formDataToSend.append("role", userRole);
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("age", String(formData.age));
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("experience", String(formData.experience));
        formDataToSend.append("address", formData.address);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("termsAndCondition",formData.terms);
        formDataToSend.append("state", formData.state);
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("aadhaarCard", formData.aadhaarCard);

        // Append Aadhaar file

        const response = await axiosInstance.post("/auth/register", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data", // important!
            },
        });

        console.log("userData", response.data.user);

        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        toast.success("Registration successful!");
        setTimeout(() => {
            const dashboardRoute =
                userRole === "labour" ? "/labour" : "/contractor";
            navigate(dashboardRoute);
        }, 1000);
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