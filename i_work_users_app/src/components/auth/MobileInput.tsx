import React from "react";
import CustomButton from "../ui/CustomButton";
import CustomTextField from "../ui/CustomTextField";

interface MobileInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendOtp: () => void;
}

export default function MobileInput({
  label = "Mobile Number",
  value,
  onChange,
  onSendOtp,
}: MobileInputProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CustomTextField
        label={label}
        name="mobile"
        value={value}
        type="text"
        onChange={onChange}
      />
      <CustomButton label="Send OTP" color="success" onClick={onSendOtp} />
    </div>
  );
}
