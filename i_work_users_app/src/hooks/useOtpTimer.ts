import { useState, useEffect } from "react";

interface UseOtpTimerOptions {
  initialTime?: number; // in seconds
  onExpire?: () => void;
}

export function useOtpTimer({
  initialTime = 90,
  onExpire,
}: UseOtpTimerOptions = {}) {
  const [timer, setTimer] = useState(initialTime);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1 && onExpire) {
            onExpire();
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, onExpire]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset timer
  const resetTimer = () => setTimer(initialTime);

  // Check if expired
  const isExpired = timer === 0;

  // Check if warning (less than 1 minute)
  const isWarning = timer < 60 && timer > 0;

  return {
    timer,
    formatTime,
    resetTimer,
    isExpired,
    isWarning,
    formattedTime: formatTime(timer),
  };
}