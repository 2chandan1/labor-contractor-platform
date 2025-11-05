import mongoose, { Schema } from 'mongoose';
import { IPayment, PaymentStatus } from '../types';

const PaymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription'
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    razorpayOrderId: {
      type: String
    },
    razorpayPaymentId: {
      type: String
    },
    razorpaySignature: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    }
  },
  {
    timestamps: true
  }
);

PaymentSchema.index({ userId: 1, status: 1 });
PaymentSchema.index({ razorpayOrderId: 1 });

export default mongoose.model<IPayment>('Payment', PaymentSchema);