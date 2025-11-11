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
    city: {
      type: String,
      required: [true, 'City is required']
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
    }
  },
  {
    timestamps: true
  }
);

EmployerProfileSchema.index({ userId: 1 });
EmployerProfileSchema.index({ 'location.city': 1 });

export default mongoose.model<IEmployerProfile>('EmployerProfile', EmployerProfileSchema);