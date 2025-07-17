"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDonationSchema = exports.PaymentVerificationSchema = exports.DonationSchema = exports.AnimalSchema = void 0;
const zod_1 = require("zod");
// Animal schema
exports.AnimalSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    image: zod_1.z.string().url("Valid image URL is required"),
    medicalNeeds: zod_1.z.string().optional(),
    urgencyLevel: zod_1.z.enum(["low", "medium", "high"]).default("medium"),
    targetAmount: zod_1.z
        .number()
        .positive("Target amount must be positive")
        .optional(),
    raisedAmount: zod_1.z.number().min(0).default(0),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// Donation schema
exports.DonationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    animalId: zod_1.z.string().min(1, "Animal ID is required"),
    donorName: zod_1.z.string().min(1, "Donor name is required"),
    donorEmail: zod_1.z.string().email("Valid email is required"),
    amount: zod_1.z.number().positive("Amount must be positive"),
    razorpayOrderId: zod_1.z.string().min(1, "Razorpay order ID is required"),
    razorpayPaymentId: zod_1.z.string().optional(),
    razorpaySignature: zod_1.z.string().optional(),
    status: zod_1.z.enum(["pending", "completed", "failed"]).default("pending"),
    createdAt: zod_1.z.date().optional(),
});
// Payment verification schema
exports.PaymentVerificationSchema = zod_1.z.object({
    razorpay_order_id: zod_1.z.string(),
    razorpay_payment_id: zod_1.z.string(),
    razorpay_signature: zod_1.z.string(),
});
// Create donation request schema
exports.CreateDonationSchema = zod_1.z.object({
    animalId: zod_1.z.string().min(1, "Animal ID is required"),
    donorName: zod_1.z.string().min(1, "Donor name is required"),
    donorEmail: zod_1.z.string().email("Valid email is required"),
    amount: zod_1.z.number().positive("Amount must be positive"),
});
//# sourceMappingURL=index.js.map