import { Request, Response } from "express";
import { User, EmployeeProfile, EmployerProfile } from "../models";
import { UserStatus } from "../types";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      mobileNumber,
      role,
      fullName,
      age,
      gender,
      experience,
      address,
      city,
      state,
      pincode,
      termsAndCondition
    } = req.body;

    const aadhaarCard = req.file?.path; // Multer file path
    if (!aadhaarCard) {
      return res.status(400).json({ message: "Aadhaar card image is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user instance (but do NOT save yet)
    const user = new User({
      mobileNumber,
      role,
      status: UserStatus.ACTIVE,
      isVerified: true,
    });

    let profile;

    // Create profile instance based on role (but do NOT save yet)
    if (role === "labour") {
      profile = new EmployeeProfile({
        userId: user._id,
        fullName,
        age: Number(age),
        gender,
        aadhaarCard,
        experience: Number(experience),
        address,
        city,
        state,
        pincode,
        termsAndCondition,
        rating: { average: 0, count: 0 },
        totalWorkDays: 0,
        isAvailable: true,
      });
    } else if (role === "contractor") {
      profile = new EmployerProfile({
        userId: user._id,
        fullName,
        age,
        gender,
        address,
        city,
        aadhaarCard,
        termsAndCondition,
        rating: { average: 0, count: 0 },
        totalBookings: 0,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Save user and profile only if both creations are successful
    await user.save();
    await profile.save();

    res.status(201).json({
      success: true,
      message: "User registered",
      user: {
        ...user.toObject(),
        profile: profile.toObject(),
      },
    });
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Internal server error", error });
  }
};
