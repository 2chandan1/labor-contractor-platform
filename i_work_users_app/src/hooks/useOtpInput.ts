import { useState, useEffect, useRef } from "react";

interface UseOtpInputOptions {
  length?: number;
  onComplete?: (otp: string) => void;
  autoSubmit?: boolean;
}

export function useOtpInput({
  length = 6,
  onComplete,
  autoSubmit = true,
}: UseOtpInputOptions = {}) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const onCompleteRef = useRef(onComplete);
     useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Auto-submit when complete
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === length && autoSubmit && onCompleteRef.current) {
      onCompleteRef.current(otpString);
    }
  }, [otp, length, autoSubmit]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      while (newOtp.length < length) newOtp.push("");
      setOtp(newOtp);

      // Focus last filled input
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // Clear OTP
  const clearOtp = () => {
    setOtp(Array(length).fill(""));
    inputRefs.current[0]?.focus();
  };

  // Get OTP string
  const getOtpString = () => otp.join("");

  // Check if complete
  const isComplete = otp.join("").length === length;

  return {
    otp,
    setOtp,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    clearOtp,
    getOtpString,
    isComplete,
  };
}