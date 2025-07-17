import { z } from "zod";
export declare const AnimalSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    medicalNeeds: z.ZodOptional<z.ZodString>;
    urgencyLevel: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
    targetAmount: z.ZodOptional<z.ZodNumber>;
    raisedAmount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    image: string;
    urgencyLevel: "low" | "medium" | "high";
    raisedAmount: number;
    _id?: string | undefined;
    medicalNeeds?: string | undefined;
    targetAmount?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    name: string;
    description: string;
    image: string;
    _id?: string | undefined;
    medicalNeeds?: string | undefined;
    urgencyLevel?: "low" | "medium" | "high" | undefined;
    targetAmount?: number | undefined;
    raisedAmount?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const DonationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    animalId: z.ZodString;
    donorName: z.ZodString;
    donorEmail: z.ZodString;
    amount: z.ZodNumber;
    razorpayOrderId: z.ZodString;
    razorpayPaymentId: z.ZodOptional<z.ZodString>;
    razorpaySignature: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "completed", "failed"]>>;
    createdAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "completed" | "failed";
    animalId: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    razorpayOrderId: string;
    _id?: string | undefined;
    createdAt?: Date | undefined;
    razorpayPaymentId?: string | undefined;
    razorpaySignature?: string | undefined;
}, {
    animalId: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    razorpayOrderId: string;
    _id?: string | undefined;
    createdAt?: Date | undefined;
    status?: "pending" | "completed" | "failed" | undefined;
    razorpayPaymentId?: string | undefined;
    razorpaySignature?: string | undefined;
}>;
export declare const PaymentVerificationSchema: z.ZodObject<{
    razorpay_order_id: z.ZodString;
    razorpay_payment_id: z.ZodString;
    razorpay_signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}, {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}>;
export declare const CreateDonationSchema: z.ZodObject<{
    animalId: z.ZodString;
    donorName: z.ZodString;
    donorEmail: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    animalId: string;
    donorName: string;
    donorEmail: string;
    amount: number;
}, {
    animalId: string;
    donorName: string;
    donorEmail: string;
    amount: number;
}>;
export type Animal = z.infer<typeof AnimalSchema>;
export type Donation = z.infer<typeof DonationSchema>;
export type PaymentVerification = z.infer<typeof PaymentVerificationSchema>;
export type CreateDonationRequest = z.infer<typeof CreateDonationSchema>;
//# sourceMappingURL=index.d.ts.map