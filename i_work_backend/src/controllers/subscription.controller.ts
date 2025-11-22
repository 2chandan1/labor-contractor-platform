// controllers/subscription.controller.ts
import { Request, Response } from "express";
import Razorpay from "razorpay";
import User from "../models/User";
import { SUBSCRIPTION_PLANS } from "../constants/subscriptionPlans";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

// 1️⃣ Create Order
export const createSubscriptionOrder = async (req: Request, res: Response) => {
  try {
    const { userId, planName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Select plan price
    const plan = SUBSCRIPTION_PLANS[user.role].find(p => p.name === planName);
    if (!plan) return res.status(400).json({ message: "Invalid plan" });

    // Create Razorpay Order
    const options = {
      amount: plan.price, // in paise
      currency: "INR",
      receipt: `receipt_${user._id}_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// 2️⃣ Verify Payment
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { userId, razorpayPaymentId, razorpayOrderId, planName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user subscription
    const today = new Date();
    user.isSubscribed = true;
    user.subscription = {
      plan: planName,
      startDate: today,
      endDate: new Date(today.setMonth(today.getMonth() + 1)), // 1-month subscription
      razorpayPaymentId
    };
    await user.save();

    res.status(200).json({ success: true, message: "Subscription activated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
