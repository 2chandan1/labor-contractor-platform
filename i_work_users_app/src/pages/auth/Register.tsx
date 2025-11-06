import  { useState} from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { z,ZodError } from "zod";
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
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import CustomTextField from "../../components/ui/CustomTextField";
import MobileInput from "../../components/auth/MobileInput";

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

const labourSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 17 && Number(val)<56, "Enter a valid age between 18 - 55"),
  gender: z.string().min(1, "Please select gender"),
  mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  experience: z.string().optional(),
  location: z.string().optional(),
});

const constructorSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 17 && Number(val)<56, "Enter a valid age"),
  companyName: z.string().min(1, "Please enter company name"),
  companyAddress: z.string().min(1, "Please enter company address"),
  mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
});
 // field configs
  const labourFields :Field[]= [
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
    { label: "Experience (in years)", name: "experience" },
    { label: "Location", name: "location" },
  ];

  const constructorFields:Field[] = [
    { label: "Full Name", name: "name" },
    { label: "Company Name", name: "companyName" },
    { label: "Age", name: "age", type: "number" },
    { label: "Company Address", name: "companyAddress" },
  ];



export default function Register() {
  const [activeTab, setActiveTab] = useState<TabType>("labour");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // handle field change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleTabChange = (_: SyntheticEvent, newValue: TabType) => {
    setActiveTab(newValue);
    setOtpSent(false);
    setOtp("");
    setFormData(initialFormData);
  };

  // validation logic
  const validateForm = () => {
    const schema = activeTab === "labour" ? labourSchema : constructorSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const firstError = (result.error as ZodError).issues[0];
      return firstError?.message;
    }

    return null;
  };

  // OTP functions
  const handleSendOtp = () => {
    const error = validateForm();
    if (error) return toast.error(error);
    setOtpSent(true);
    toast.success("OTP sent successfully!");
  };
  const currentFields = activeTab === "labour" ? labourFields : constructorFields;

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          />
          </Stack>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary" mt={3}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}
        >
          Login here
        </Link>
      </Typography>
    </Box>
  );
}
