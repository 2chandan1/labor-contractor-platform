import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useOtpInput } from "../../hooks/useOtpInput";
import { useOtpTimer } from "../../hooks/useOtpTimer";

interface OTPVerificationProps {
  mobileNumber: string;
  userType?: "labour" | "constructors";
  onVerifySuccess: (token: string) => void;
  onResendOtp: () => Promise<void>;
  onBack?: () => void;
}

export default function OTPVerification({
  onVerifySuccess,
  onResendOtp,
  onBack,
}: OTPVerificationProps) {
  
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  // ✅ Use OTP input hook
  const {
    otp,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    clearOtp,
    getOtpString,
    isComplete,
  } = useOtpInput({
    length: 6,
    autoSubmit: true,
    onComplete: () => handleVerify(),
  });

  // ✅ Use timer hook
  const { timer, formattedTime, resetTimer, isExpired, isWarning } = useOtpTimer({
    initialTime: 300,
    onExpire: () => toast.error("OTP has expired"),
  });
 

  // Verify OTP
  const handleVerify = useCallback(async () => {
    const otpString = getOtpString();

    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    if (isExpired) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await verifyOTP(mobileNumber, otpString, userType);
      // onVerifySuccess(response.data.token);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success (remove this in production)
      if (otpString === "123456") {
        toast.success("OTP verified successfully!");
        onVerifySuccess("mock-jwt-token-" + Date.now());
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      clearOtp();
    } finally {
      setLoading(false);
    }
  }, [getOtpString, isExpired, onVerifySuccess, clearOtp]);

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    try {
      await onResendOtp();
       resetTimer();
      clearOtp();
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        p: 4,
      }}
    >
      <Stack spacing={3}>
        {/* Instructions */}
        <Typography
          variant="body2"
          color={isWarning ? "error" : "text.secondary"}
          textAlign="center"
          sx={{ mb: 1 }}
        >
          We've sent a verification code to your mobile number
        </Typography>

        {/* OTP Input Boxes */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading}
              style={{
                width: "48px",
                height: "56px",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "600",
                border: digit
                  ? "2px solid #1976d2"
                  : "2px solid rgba(0, 0, 0, 0.15)",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.2s",
                backgroundColor: digit ? "#e3f2fd" : "white",
                cursor: loading ? "not-allowed" : "text",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1976d2";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(25, 118, 210, 0.15)";
              }}
              onBlur={(e) => {
                if (!digit) e.target.style.borderColor = "rgba(0, 0, 0, 0.15)";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </Box>

        {/* Timer */}
        <Typography
          variant="body2"
          textAlign="center"
          color={timer < 60 ? "error" : "text.secondary"}
          fontWeight={500}
        >
          {timer > 0 ? (
            <>
              ⏱️ Time remaining: <strong>{formattedTime}</strong>
            </>
          ) : (
            <span style={{ color: "#d32f2f" }}>⚠️ OTP expired</span>
          )}
        </Typography>

        {/* Verify Button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleVerify}
          disabled={loading || !isComplete || isExpired}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Resend OTP */}
        <Box textAlign="center">
          {timer > 0 ? (
            <Typography variant="body2" color="text.secondary">
              Didn't receive OTP?{" "}
              <Typography
                component="span"
                color="text.disabled"
                sx={{ fontWeight: 500 }}
              >
                Resend in {formattedTime}
              </Typography>
            </Typography>
          ) : (
            <Button
              variant="text"
              onClick={handleResend}
              disabled={resending}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {resending ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Sending...
                </>
              ) : (
                "🔄 Resend OTP"
              )}
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Back Button */}
        {onBack && (
          <Button
            variant="outlined"
            fullWidth
            onClick={onBack}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            ← Edit Mobile Number
          </Button>
        )}

        {/* Helper Text */}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ fontSize: "12px", mt: 2 }}
        >
          💡 Tip: For testing, use OTP: <strong>123456</strong>
        </Typography>
      </Stack>
    </Paper>
  );
}