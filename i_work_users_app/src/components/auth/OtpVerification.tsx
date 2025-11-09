import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  const { timer, formattedTime, resetTimer, isExpired, isWarning } = useOtpTimer({
    initialTime: 90,
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
    } catch (error) {
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
    <Card className="w-full max-w-md mx-auto p-6 backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg rounded-2xl">
      <CardHeader>
        <p
          className={`text-center text-sm ${
            isWarning ? "text-red-600" : "text-gray-500"
          }`}
        >
          We've sent a verification code to your mobile number
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-6">
        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 sm:gap-3">
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
              className={`w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 transition-all focus:outline-none
                ${
                  digit
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-300 bg-white text-gray-700"
                }
                focus:ring-4 focus:ring-primary/30
              `}
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
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Didn’t receive OTP?{" "}
              <span className="text-gray-400 font-medium">
                Resend in {formattedTime}
              </span>
            </p>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-primary hover:bg-primary/10"
            >
              {resending ? (
                <>
                  <Loader2 className="animate-spin mr-1 h-4 w-4" /> Sending...
                </>
              ) : (
                "🔄 Resend OTP"
              )}
            </Button>
          )}
        </div>

        <Separator className="my-2" />

        {onBack && (
          <Button
            variant="outline"
            className="w-full py-5 text-base font-semibold rounded-xl"
            onClick={onBack}
            disabled={loading}
          >
            ← Edit Mobile Number
          </Button>
        )}

        <p className="text-xs text-gray-400 text-center mt-2">
          💡 Tip: For testing, use OTP: <strong>123456</strong>
        </p>
      </CardContent>
    </Card>
  );
}
