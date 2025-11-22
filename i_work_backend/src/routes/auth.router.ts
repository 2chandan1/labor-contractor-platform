import express from "express";
import multer from "multer";
import { register,sendOtp,otpVerify,checkUser  } from "../controllers/auth.controller";
import { createSubscriptionOrder, verifyPayment } from "../controllers/subscription.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/aadhar");
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



router.post("/create-order", createSubscriptionOrder);
router.post("/verify-payment", verifyPayment);


export default router;
