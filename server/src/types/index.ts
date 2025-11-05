import { Document } from 'mongoose';

// User Roles
export enum UserRole {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
  ADMIN = 'admin'
}

// User Status
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

// Labor/Work Types
export enum LaborType {
  MASON = 'mason',
  CONSTRUCTION_WORKER = 'construction_worker',
  PLUMBER = 'plumber',
  ELECTRICIAN = 'electrician',
  PAINTER = 'painter',
  CARPENTER = 'carpenter',
  WELDER = 'welder',
  HELPER = 'helper'
}

// Booking Status
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Subscription Plans
export enum SubscriptionPlan {
  EMPLOYEE_MONTHLY = 'employee_monthly', // ₹49/month
  EMPLOYER_MONTHLY = 'employer_monthly', // ₹150/month
  EMPLOYER_QUARTERLY = 'employer_quarterly', // ₹400/3 months
  EMPLOYER_HALF_YEARLY = 'employer_half_yearly' // ₹750/6 months
}

// Payment Status
export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Availability Type
export enum AvailabilityType {
  SAME_DAY = 'same_day',
  ADVANCE = 'advance'
}

// User Interface
export interface IUser extends Document {
  mobileNumber: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Employee Profile Interface
export interface IEmployeeProfile extends Document {
  userId: IUser['_id'];
  fullName: string;
  age: number;
  profilePhoto?: string;
  aadhaarCard: {
    number: string;
    imageUrl: string;
  };
  laborTypes: LaborType[];
  experience: number; // in years
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  rating: {
    average: number;
    count: number;
  };
  totalWorkDays: number;
  isAvailable: boolean;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Employer Profile Interface
export interface IEmployerProfile extends Document {
  userId: IUser['_id'];
  fullName: string;
  companyName?: string;
  profilePhoto?: string;
  location: {
    city: string;
    state: string;
    address?: string;
  };
  rating: {
    average: number;
    count: number;
  };
  totalBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription Interface
export interface ISubscription extends Document {
  userId: IUser['_id'];
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isTrial: boolean; // First month free for employees
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Interface
export interface IBooking extends Document {
  employerId: IUser['_id'];
  employeeId: IUser['_id'];
  laborType: LaborType;
  bookingDate: Date;
  availabilityType: AvailabilityType;
  status: BookingStatus;
  location: {
    address: string;
    city: string;
    coordinates?: [number, number];
  };
  numberOfLabors: number;
  contactShared: boolean;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Rating Interface
export interface IRating extends Document {
  bookingId: IBooking['_id'];
  fromUserId: IUser['_id'];
  toUserId: IUser['_id'];
  rating: number; // 1-5
  review?: string;
  createdAt: Date;
}

// Payment Interface
export interface IPayment extends Document {
  userId: IUser['_id'];
  subscriptionId?: ISubscription['_id'];
  amount: number;
  currency: string;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}