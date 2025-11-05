import mongoose, { Schema } from 'mongoose';
import { ISubscription, SubscriptionPlan } from '../types';

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    plan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      required: true
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isTrial: {
      type: Boolean,
      default: false
    },
    autoRenew: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

SubscriptionSchema.index({ userId: 1, isActive: 1 });
SubscriptionSchema.index({ endDate: 1 });

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);