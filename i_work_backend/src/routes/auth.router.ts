import express from "express";
import multer from "multer";
import { register } from "../controllers/auth.controller";
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
router.post("/register", upload.single("aadhaarCard"), register);

export default router;
