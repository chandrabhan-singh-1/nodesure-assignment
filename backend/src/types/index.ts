import { z } from "zod";

// Animal schema
export const AnimalSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Valid image URL is required"),
  medicalNeeds: z.string().optional(),
  urgencyLevel: z.enum(["low", "medium", "high"]).default("medium"),
  targetAmount: z
    .number()
    .positive("Target amount must be positive")
    .optional(),
  raisedAmount: z.number().min(0).default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Donation schema
export const DonationSchema = z.object({
  _id: z.string().optional(),
  animalId: z.string().min(1, "Animal ID is required"),
  donorName: z.string().min(1, "Donor name is required"),
  donorEmail: z.string().email("Valid email is required"),
  amount: z.number().positive("Amount must be positive"),
  razorpayOrderId: z.string().min(1, "Razorpay order ID is required"),
  razorpayPaymentId: z.string().optional(),
  razorpaySignature: z.string().optional(),
  status: z.enum(["pending", "completed", "failed"]).default("pending"),
  createdAt: z.date().optional(),
});

// Payment verification schema
export const PaymentVerificationSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

// Create donation request schema
export const CreateDonationSchema = z.object({
  animalId: z.string().min(1, "Animal ID is required"),
  donorName: z.string().min(1, "Donor name is required"),
  donorEmail: z.string().email("Valid email is required"),
  amount: z.number().positive("Amount must be positive"),
});

// Export types
export type Animal = z.infer<typeof AnimalSchema>;
export type Donation = z.infer<typeof DonationSchema>;
export type PaymentVerification = z.infer<typeof PaymentVerificationSchema>;
export type CreateDonationRequest = z.infer<typeof CreateDonationSchema>;
