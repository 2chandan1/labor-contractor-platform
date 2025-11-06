import React from "react";
import CustomButton from "../ui/CustomButton";
import CustomTextField from "../ui/CustomTextField";
import { InputAdornment, Box } from "@mui/material";
interface MobileInputProps {
  label?: string;
  value: string;
  error?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendOtp: () => void;
}

export default function MobileInput({
  label = "Mobile Number",
  value,
  onChange,
  onSendOtp,
  error
}: MobileInputProps) {
  return (
     <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
      <CustomTextField
        label={label}
        name="mobile"
        value={value}
        type="text"
        error={error}
        onChange={onChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
        }}
      />
      <CustomButton label="Send OTP" color="success" onClick={onSendOtp} />
    </Box>
  );
}
