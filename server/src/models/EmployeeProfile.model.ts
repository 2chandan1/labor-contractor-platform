import mongoose, { Schema } from 'mongoose';
import { IEmployeeProfile, LaborType } from '../types';

const EmployeeProfileSchema = new Schema<IEmployeeProfile>(
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
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Minimum age is 18'],
      max: [55, 'Maximum age is 55']
    },
    profilePhoto: {
      type: String,
      default: null
    },
    aadhaarCard: {
      number: {
        type: String,
        required: [true, 'Aadhaar number is required'],
        unique: true,
        match: [/^\d{12}$/, 'Please provide a valid 12-digit Aadhaar number']
      },
      imageUrl: {
        type: String,
        required: [true, 'Aadhaar card image is required']
      }
    },
    laborTypes: {
      type: [String],
      enum: Object.values(LaborType),
      required: [true, 'At least one labor type is required'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0 && v.length <= 5;
        },
        message: 'Select between 1 and 5 labor types'
      }
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience cannot be negative'],
      max: [50, 'Experience seems too high']
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (v: number[]) => Array.isArray(v) && v.length === 2,
          message: 'Invalid coordinates'
        }
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
      }
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
    totalWorkDays: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    languages: {
      type: [String],
      default: ['Hindi', 'English']
    }
  },
  {
    timestamps: true
  }
);

// Geospatial index for location-based queries
EmployeeProfileSchema.index({ 'location.coordinates': '2dsphere' });
EmployeeProfileSchema.index({ userId: 1 });
EmployeeProfileSchema.index({ laborTypes: 1 });
EmployeeProfileSchema.index({ 'location.city': 1 });
EmployeeProfileSchema.index({ isAvailable: 1 });

export default mongoose.model<IEmployeeProfile>('EmployeeProfile', EmployeeProfileSchema);