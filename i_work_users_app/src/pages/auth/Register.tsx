import { useState } from "react";
import type {  SyntheticEvent } from "react";
import { z } from "zod";
import {
  Tabs,
  Tab,
  MenuItem,
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomTextField from "../../components/ui/CustomTextField";
import MobileInput from "../../components/auth/MobileInput";
import OTPVerification from "../../components/auth/OtpInput";
import { useAuthForm } from "../../hooks/useAuth";


type TabType = "labour" | "constructors";

interface FormData {
  name: string;
  age: string;
  gender: string;
  experience: string;
  location: string;
  companyName: string;
  companyAddress: string;
  mobile: string;
}

interface BaseField {
  label: string;
  name: keyof FormData;
  type?: string;
}

interface SelectField extends BaseField {
  select: true;
  options: { value: string; label: string }[];
}

type Field = BaseField | SelectField;

const isSelectField = (field: Field): field is SelectField => "select" in field;

const initialFormData: FormData = {
  name: "",
  age: "",
  gender: "",
  experience: "",
  location: "",
  companyName: "",
  companyAddress: "",
  mobile: "",
};

// Validation Schemas
const labourSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 17 && Number(val) < 56,
      "Enter a valid age between 18 - 55"
    ),
  gender: z.string().min(1, "Please select gender"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  experience: z.string().min(1, "Please enter your experience"),
  location: z.string().min(1, "Please enter your location"),
});

const constructorSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 17 && Number(val) < 56,
      "Enter a valid age between 18 - 55"
    ),
  companyName: z.string().min(1, "Please enter company name"),
  companyAddress: z.string().min(1, "Please enter company address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

// Field Configurations
const labourFields: Field[] = [
  { label: "Full Name", name: "name" },
  { label: "Age", name: "age", type: "number" },
  {
    label: "Gender",
    name: "gender",
    select: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  { label: "Experience (in years)", name: "experience", type: "number" },
  { label: "Location", name: "location" },
];

const constructorFields: Field[] = [
  { label: "Full Name", name: "name" },
  { label: "Age", name: "age", type: "number" },
  { label: "Company Name", name: "companyName" },
  { label: "Company Address", name: "companyAddress" },
];

export default function Register() {

  const navigate = useNavigate();
  
  // State Management
  const [activeTab, setActiveTab] = useState<TabType>("labour");
 const {
    step,
    formData,
    errors,
    setFormData,
    setErrors,
    setStep,
    handleChange,
    handleSendOtp,
    handleResendOtp,
    handleOtpVerified,
    handleBackToForm,
    resetForm,
  } = useAuthForm({
    initialData: initialFormData,
    validationSchema: activeTab === "labour" ? labourSchema : constructorSchema,
    userRole: activeTab,
    isLogin: false,
  });
  // Get current fields based on active tab
  const currentFields = activeTab === "labour" ? labourFields : constructorFields;

  // Handle tab change
  const handleTabChange = (_: SyntheticEvent, newValue: TabType) => {
    // Ask for confirmation if form has data
    const hasData = Object.values(formData).some((val) => val !== "");
    
    if (hasData) {
      const confirmed = window.confirm(
        "Switching tabs will clear your form data. Continue?"
      );
      if (!confirmed) return;
    }

    setActiveTab(newValue);
    setFormData(initialFormData);
    setErrors({});
    setStep("form");
    resetForm;
  };



  return (
    <Box
      sx={{
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        py: 6,
        px: 2,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Registration Form Step */}
      {step === "form" && (
        <>
          <Typography variant="h4" fontWeight={600} mb={1}>
            Register
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Create your account as{" "}
            <Typography component="span" fontWeight={600} color="text.primary">
              {activeTab === "labour" ? "Labour" : "Constructor"}
            </Typography>
          </Typography>

          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab value="labour" label="Labour" />
              <Tab value="constructors" label="Constructor" />
            </Tabs>

            <Divider />

            <Box sx={{ p: 4 }}>
              <Stack spacing={2.5}>
                {currentFields.map((field) => (
                  <CustomTextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    select={isSelectField(field)}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleChange}
                    error={errors[field.name]}
                  >
                    {isSelectField(field) &&
                      field.options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                  </CustomTextField>
                ))}
                
                <MobileInput
                  value={formData.mobile}
                  onChange={handleChange}
                  onSendOtp={handleSendOtp}
                  label="Mobile Number"
                  error={errors.mobile}
                />
              </Stack>
            </Box>
          </Paper>

          <Typography variant="body2" color="text.secondary" mt={3}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Login here
            </Link>
          </Typography>
        </>
      )}

      {/* OTP Verification Step */}
      {step === "otp" && (
        <>
          <Typography variant="h4" fontWeight={600} mb={1}>
            Verify OTP
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Enter the 6-digit code sent to{" "}
            <Typography component="span" fontWeight={600} color="text.primary">
              +91 {formData.mobile}
            </Typography>
          </Typography>

          <OTPVerification
            mobileNumber={formData.mobile}
            userType={activeTab}
            onVerifySuccess={handleOtpVerified}
            onResendOtp={handleResendOtp}
            onBack={handleBackToForm}
          />
        </>
      )}
    </Box>
  );
}