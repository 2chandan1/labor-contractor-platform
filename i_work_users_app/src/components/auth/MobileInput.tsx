import React from "react";
import { TextField, Button } from "@mui/material";

interface MobileInputProps {
  onSendOtp: () => void;
  label?: string;
}

const MobileInput: React.FC<MobileInputProps> = ({ onSendOtp, label = "Mobile Number" }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm ">
      <TextField
        label={label}
        variant="outlined"
        fullWidth
       
      />
      <Button
        variant="contained"
        color="primary"
        className="w-full"
        onClick={onSendOtp}
      >
        Send OTP
      </Button>
    </div>
  );
};

export default MobileInput;
