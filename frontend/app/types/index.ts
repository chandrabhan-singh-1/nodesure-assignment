import { z } from "zod";

// Animal schema - matching backend
export const AnimalSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  medicalNeeds: z.string().optional(),
  urgencyLevel: z.enum(["low", "medium", "high"]),
  targetAmount: z.number().optional(),
  raisedAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Donation form schema
export const DonationFormSchema = z.object({
  donorName: z.string().min(1, "Name is required"),
  donorEmail: z.string().email("Valid email is required"),
  amount: z.number().min(1, "Amount must be at least ₹1"),
});

// API Response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Razorpay order response
export const RazorpayOrderSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  currency: z.string(),
  donationId: z.string(),
  keyId: z.string(), // Add keyId field
});

// Export types
export type Animal = z.infer<typeof AnimalSchema>;
export type DonationForm = z.infer<typeof DonationFormSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type RazorpayOrder = z.infer<typeof RazorpayOrderSchema>;

// Razorpay payment options
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

// Urgency level colors
export const urgencyColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;
