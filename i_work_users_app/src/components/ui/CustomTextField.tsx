import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type React from "react";

export type CustomTextFieldProps = Omit<TextFieldProps, "onChange" | "value"> & {
  label?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

export default function CustomTextField({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  size = "medium",
  margin = "dense",
  sx = {},
  children,
  className = "",
  ...props
}: CustomTextFieldProps) {
  return (
    <TextField
      {...props}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      size={size}
      margin={margin}
      select={props.select}
      sx={{
        borderRadius: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2.5,
          transition: "all 0.25s ease-in-out",
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.15)",
          },
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.15)",
          },
        },
        ...sx,
      }}
    >{children}
    </TextField>
  );
}
