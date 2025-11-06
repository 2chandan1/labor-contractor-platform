import { Box, Paper, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import  { Toaster } from "react-hot-toast";
import z from "zod";
import MobileInput from "../../components/auth/MobileInput";
import OTPVerification from "../../components/auth/OtpInput";
import { useAuthForm } from "../../hooks/useAuth";

// ✅ Validation schema
const mobileSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});
interface FormData {
  mobile: string;
}

const initialFormData: FormData = { mobile: "" };

export default function Login () {
    const {
    step,
    formData,
    errors,
    handleChange,
    handleSendOtp,
    handleResendOtp,
    handleOtpVerified,
    handleBackToForm,
  } = useAuthForm({
    initialData: initialFormData,
    validationSchema: mobileSchema,
    isLogin: true,
  });

  // ✅ UI
  return (
    <Box
      sx={{
        bgcolor: "grey.50",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Toaster position="top-center" />
      {step === "login" && (
        <>
          <Paper
            elevation={8}
            sx={{
              p: 5,
              width: "100%",
              maxWidth: 420,
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={600} mb={1}>
              Welcome Back!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Login to your account
            </Typography>

            <Typography variant="h6" color="text.secondary" mb={3}>
              Please enter your mobile number
            </Typography>
            <MobileInput
              value={formData.mobile}
              onChange={handleChange}
              onSendOtp={handleSendOtp}
              label="Mobile Number"
              error={errors.mobile}
            />
          </Paper>
          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2", fontWeight: 500 }}>
              Register here
            </Link>
          </Typography>
        </>
      )}
      {step === "otp" && (
        <>
          <Typography variant="h4" fontWeight={600} mb={1}>
            Verify OTP
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Enter the 6-digit code sent to{" "}
            <Typography component="span" fontWeight={600} color="text.primary">
              +91 {formData.mobile}
            </Typography>
          </Typography>

          <OTPVerification
            mobileNumber={formData.mobile}
            onVerifySuccess={handleOtpVerified}
            onResendOtp={handleResendOtp}
            onBack={handleBackToForm}
          />
        </>
      )}

    </Box>
  );
};
