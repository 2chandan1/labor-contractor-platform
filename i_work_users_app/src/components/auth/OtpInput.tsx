import React from "react";
import { TextField, Button } from "@mui/material";

interface OtpInputProps {
  onVerifyOtp: () => void;
  onResend: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ onVerifyOtp, onResend }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      <TextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        inputProps={{ maxLength: 6 }}
      />
      <Button
        variant="contained"
        color="primary"
        className="w-full"
        onClick={onVerifyOtp}
      >
        Verify OTP
      </Button>
      <Button variant="text" onClick={onResend}>
        Resend OTP
      </Button>
    </div>
  );
};

export default OtpInput;
