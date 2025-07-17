import mongoose, { Schema, Document } from "mongoose";
import { Donation } from "../types/index";

export interface IDonation extends Omit<Donation, "_id">, Document {}

const donationSchema = new Schema<IDonation>(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    donorName: {
      type: String,
      required: true,
      trim: true,
    },
    donorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const DonationModel = mongoose.model<IDonation>(
  "Donation",
  donationSchema
);
