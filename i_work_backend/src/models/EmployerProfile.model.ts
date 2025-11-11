import mongoose, { Schema } from 'mongoose';
import { IEmployerProfile } from '../types';

const EmployerProfileSchema = new Schema<IEmployerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [200, 'Company name must not exceed 200 characters']
    },
    profilePhoto: {
      type: String,
      default: null
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Minimum age is 18'],
      max: [55, 'Maximum age is 55']
    },
    gender:{
      type: String,
      default: 'Not Specified'
    },
    aadhaarCard: {
      type: String,
      required: [true, 'Aadhaar card image is required']
    },
    city: {
      type: String,
     
    },
    address: {
      type: String
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    termsAndCondition:{
      type:Boolean
    },
  },
  {
    timestamps: true
  }
);

EmployerProfileSchema.index({ userId: 1 });
EmployerProfileSchema.index({ 'city': 1 });

export default mongoose.model<IEmployerProfile>('EmployerProfile', EmployerProfileSchema);