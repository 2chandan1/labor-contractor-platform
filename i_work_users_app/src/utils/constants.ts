// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'labor_auth_token',
  USER: 'labor_user_data',
  LANGUAGE: 'labor_app_language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/logins',
  REGISTER: '/register',
  OTP_VERIFY: '/verify-otp',
  
  // Employee Routes
  EMPLOYEE_DASHBOARD: '/employee/dashboard',
  EMPLOYEE_PROFILE: '/employee/profile',
  EMPLOYEE_JOBS: '/employee/jobs',
  EMPLOYEE_SUBSCRIPTION: '/employee/subscription',
  
  // Employer Routes
  EMPLOYER_DASHBOARD: '/employer/dashboard',
  EMPLOYER_SEARCH: '/employer/search',
  EMPLOYER_BOOKINGS: '/employer/bookings',
  EMPLOYER_SUBSCRIPTION: '/employer/subscription',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_BOOKINGS: '/admin/bookings',
} as const;

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  EMPLOYEE: {
    MONTHLY: { price: 49, duration: 1, name: 'Monthly' },
  },
  EMPLOYER: {
    MONTHLY: { price: 150, duration: 1, name: 'Monthly' },
    QUARTERLY: { price: 400, duration: 3, name: '3 Months' },
    HALF_YEARLY: { price: 750, duration: 6, name: '6 Months' },
  },
} as const;

// Labor Types with Display Names
export const LABOR_TYPES_CONFIG = {
  mason: { label: 'Mason', icon: '🧱' },
  construction_worker: { label: 'Construction Worker', icon: '👷' },
  plumber: { label: 'Plumber', icon: '🔧' },
  electrician: { label: 'Electrician', icon: '⚡' },
  painter: { label: 'Painter', icon: '🎨' },
  carpenter: { label: 'Carpenter', icon: '🪚' },
  welder: { label: 'Welder', icon: '🔥' },
  helper: { label: 'Helper', icon: '🤝' },
} as const;

// Age Constraints
export const AGE_CONSTRAINTS = {
  MIN: 18,
  MAX: 55,
} as const;

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  // Add more as needed
] as const;

// Metropolitan Cities
export const METRO_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
] as const;