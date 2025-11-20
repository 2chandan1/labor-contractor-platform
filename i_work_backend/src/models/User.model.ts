import mongoose, { Schema } from 'mongoose';
import { IUser, UserRole, UserStatus } from '../types';

const UserSchema = new Schema<IUser>(
  {
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian mobile number']
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, 'User role is required']
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING_VERIFICATION
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date
    },
    isSubscribed: {
      type: Boolean,
      default: false
    },
    subscription: {
      plan: { type: String },              
      startDate: { type: Date },       
      endDate: { type: Date },             
      razorpayPaymentId: { type: String } 
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
UserSchema.index({ role: 1, status: 1 });

export default mongoose.model<IUser>('User', UserSchema);
