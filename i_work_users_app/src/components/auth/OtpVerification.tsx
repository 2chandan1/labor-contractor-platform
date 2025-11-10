import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useOtpInput } from "../../hooks/useOtpInput";
import { useOtpTimer } from "../../hooks/useOtpTimer";
import { Loader2 } from "lucide-react";

interface OTPVerificationProps {
  mobileNumber: string;
  userType?: "labour" | "constructor";
  onVerifySuccess: (token: string) => void;
  onResendOtp: () => Promise<void>;
  onBack?: () => void;
}

export default function OTPVerification({
  mobileNumber,
  onVerifySuccess,
  onResendOtp,
  onBack,
}: OTPVerificationProps) {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

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

  const {
    resendTimer,
    expireTimer,
    formattedResendTime,
    isExpired,
    resetTimer,
  } = useOtpTimer({
    resendTime: 15, // time before resend enabled
    expireTime: 20, // OTP expiry time
    onExpire: () => toast.error("OTP has expired"),
  });

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (otpString === "123456") {
        toast.success("OTP verified successfully!");
        onVerifySuccess("mock-jwt-token-" + Date.now());
      } else {
        throw new Error("Invalid OTP");
      }
    } catch {
      toast.error("Invalid OTP. Please try again.");
      clearOtp();
    } finally {
      setLoading(false);
    }
  }, [getOtpString, isExpired, onVerifySuccess, clearOtp]);

  const handleResend = async () => {
    setResending(true);
    try {
      await onResendOtp();
      resetTimer();
      clearOtp();
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <Card className="w-full sm:max-w-md max-w-sm mx-auto p-6 backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg rounded-2xl">
      <CardHeader>
        <div className="text-center text-l">
          <p className="text-gray-700 mb-2">Please enter the OTP sent to</p>
          <span className="font-semibold text-gray-700">+91 {mobileNumber}</span>
          {onBack && (
            <button
              onClick={onBack}
              disabled={loading}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium underline transition-colors px-2 disabled:opacity-50"
            >
              Change
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-6">
        {/* OTP Boxes */}
        <div className="flex justify-center gap-1 sm:gap-3">
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
              className={`sm:w-12 sm:h-14 w-10 h-12 text-center text-xl font-semibold rounded-xl border-2 transition-all focus:outline-none ${
                digit
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-300 bg-white text-gray-700"
              } focus:ring-4 focus:ring-primary/30`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={loading || !isComplete || isExpired}
          className="w-full py-5 text-base font-semibold rounded-xl transition-all hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Resend Section */}
        <div className="text-center mt-4 flex items-center justify-center">
          <span className="text-sm text-gray-800 pr-2">Didn’t receive OTP?</span>
          {resendTimer > 0 ? (
            <span className="text-blue-700 font-medium animate-pulse">
              {formattedResendTime}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-blue-500 font-medium hover:underline text-sm transition-all duration-200 disabled:text-gray-400"
            >
              {resending ? (
                <span className="flex items-center justify-center gap-1">
                  <Loader2 className="animate-spin h-4 w-4" /> Sending...
                </span>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
