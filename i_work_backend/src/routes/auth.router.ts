import express from "express";
import multer from "multer";
import { register,sendOtp,otpVerify,checkUser  } from "../controllers/auth.controller";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/aadhaar");
  },

  filename: (req, file, cb) => {
    const fullName = req.body.fullName?.replace(/\s+/g, "_") || "user"; 
    const ext = file.originalname.split('.').pop();
    const uniqueName = `aadhaarcard_${fullName}.${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Register route
router.post("/check-user",checkUser)
router.post("/register", upload.single("aadhaarCard"), register);
router.post("/send-otp",sendOtp)
router.post("/verify-otp",otpVerify)

export default router;
