import React, { useState } from "react";
import { Tabs, Tab, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MobileInput from "../../components/auth/MobileInput";

type TabType = "employee" | "employer";

const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("employee");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Common form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    experience: "",
    location: "",
    companyName: "",
    companyAddress: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    setActiveTab(newValue);
    setOtpSent(false);
    setOtp("");
    setFormData({
      name: "",
      age: "",
      gender: "",
      experience: "",
      location: "",
      companyName: "",
      companyAddress: "",
      mobile: "",
    });
  };

  const handleSendOtp = () => {
    if (!formData.mobile) return alert("Please enter mobile number");
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    alert(`${activeTab} registered successfully!`);
  };

  const handleResendOtp = () => {
    alert("OTP resent!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
      <h2 className="text-2xl font-semibold mb-2">Register</h2>
      <p className="text-gray-600 mb-6">Create your account as Employee or Employer</p>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="employee" label="Employee" />
          <Tab value="employer" label="Employer" />
        </Tabs>

        <div className="p-6 flex flex-col gap-4">
          {/* EMPLOYEE FORM */}
          {activeTab === "employee" && (
            <>
              <TextField
                label="Full Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.age}
                onChange={handleChange}
              />
              <TextField
                select
                label="Gender"
                name="gender"
                variant="outlined"
                fullWidth
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                label="Experience (in years)"
                name="experience"
                variant="outlined"
                fullWidth
                value={formData.experience}
                onChange={handleChange}
              />
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={handleChange}
              />
            </>
          )}

          {/* EMPLOYER FORM */}
          {activeTab === "employer" && (
            <>
              <TextField
                label="Full Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Company Name"
                name="companyName"
                variant="outlined"
                fullWidth
                value={formData.companyName}
                onChange={handleChange}
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.age}
                onChange={handleChange}
              />
              
              <TextField
                label="Company Address"
                name="companyAddress"
                variant="outlined"
                fullWidth
                value={formData.companyAddress}
                onChange={handleChange}
              />
            </>
          )}

          {/* MOBILE & OTP Section */}
          <MobileInput
                      onSendOtp={handleSendOtp}
                      label="Mobile Number"
                    />

         
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
