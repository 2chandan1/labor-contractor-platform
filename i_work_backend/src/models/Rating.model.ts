import mongoose, { Schema } from 'mongoose';
import { IRating } from '../types';

const RatingSchema = new Schema<IRating>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      maxlength: [500, 'Review must not exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// Ensure one rating per user per booking
RatingSchema.index({ bookingId: 1, fromUserId: 1 }, { unique: true });
RatingSchema.index({ toUserId: 1 });

export default mongoose.model<IRating>('Rating', RatingSchema);