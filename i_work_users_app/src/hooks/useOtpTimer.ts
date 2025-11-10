import { useState, useEffect, useCallback } from "react";

interface UseOtpTimerOptions {
  resendTime?: number; 
  expireTime?: number; 
  onExpire?: () => void;
}

export function useOtpTimer({
  resendTime = 7,
  expireTime = 180,
  onExpire,
}: UseOtpTimerOptions = {}) {
   const [resendTimer, setResendTimer] = useState(resendTime);
  const [expireTimer, setExpireTimer] = useState(expireTime);
  const [isExpired, setIsExpired] = useState(false);
   useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);
  // Timer countdown
  // ⏳ OTP expiry countdown
  useEffect(() => {
    if (expireTimer > 0) {
      const interval = setInterval(() => {
        setExpireTimer((prev) => {
          if (prev === 1) {
            setIsExpired(true);
            onExpire?.();
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [expireTimer, onExpire]);

  const resetTimer = useCallback(() => {
    setResendTimer(resendTime);
    setExpireTimer(expireTime);
    setIsExpired(false);
  }, [resendTime, expireTime]);
  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };



  // Check if warning (less than 1 minute)
 

  return {
    resendTimer,
    expireTimer,
    formattedResendTime: formatTime(resendTimer),
    formattedExpireTime: formatTime(expireTimer),
    resetTimer,
    isExpired,
  };
}