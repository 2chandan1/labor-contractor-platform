// User Types
export const UserRole = {
  LABOUR: 'labour',
  CONTRACTOR: 'contractor',
  ADMIN: 'admin'
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification'
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];


export interface User {
  _id: string;
  mobileNumber: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  mobileNumber: string;
}

export interface VerifyOTPRequest {
  mobileNumber: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

// Labor Types
export const LaborType = {
  MASON: 'mason',
  CONSTRUCTION_WORKER: 'construction_worker',
  PLUMBER: 'plumber',
  ELECTRICIAN: 'electrician',
  PAINTER: 'painter',
  CARPENTER: 'carpenter',
  WELDER: 'welder',
  HELPER: 'helper'
} as const;
export type LaborType = typeof LaborType[keyof typeof LaborType];

// Booking Status
export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus];

// API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}