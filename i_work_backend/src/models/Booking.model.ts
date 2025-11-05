import mongoose, { Schema } from 'mongoose';
import { IBooking, LaborType, BookingStatus, AvailabilityType } from '../types';

const BookingSchema = new Schema<IBooking>(
  {
    employerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    laborType: {
      type: String,
      enum: Object.values(LaborType),
      required: true
    },
    bookingDate: {
      type: Date,
      required: true
    },
    availabilityType: {
      type: String,
      enum: Object.values(AvailabilityType),
      required: true
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING
    },
    location: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      coordinates: {
        type: [Number]
      }
    },
    numberOfLabors: {
      type: Number,
      default: 1,
      min: 1,
      max: 10
    },
    contactShared: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date
    },
    cancelledAt: {
      type: Date
    },
    cancellationReason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

BookingSchema.index({ employerId: 1, status: 1 });
BookingSchema.index({ employeeId: 1, status: 1 });
BookingSchema.index({ bookingDate: 1 });
BookingSchema.index({ status: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);