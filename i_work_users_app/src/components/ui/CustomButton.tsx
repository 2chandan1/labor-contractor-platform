import React from "react";
import { Button} from "@mui/material";
import type { ButtonProps } from "@mui/material";
interface CustomButtonProps extends ButtonProps {
    label: string;
    fullWidth?: boolean;
}
const CustomButton : React.FC<CustomButtonProps>=({
    label,
    fullWidth=false,
    variant = "contained",
    color = "primary",
    disabled = false,
    className = "",
    ...props
})=>{
    return(
        <Button
        variant={variant}
        color={color}
        disabled={disabled}
        className={`${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
        >
        {label}
        </Button>

    )}
export default CustomButton;
