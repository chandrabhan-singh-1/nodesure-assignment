import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { DonationModel } from "../models/Donation";
import { AnimalModel } from "../models/Animal";
import {
  CreateDonationSchema,
  PaymentVerificationSchema,
} from "../types/index";

export const createDonationOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Check if environment variables are set
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Missing Razorpay environment variables");
    res.status(500).json({
      success: false,
      message: "Payment service configuration error",
    });
    return;
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  try {
    const validatedData = CreateDonationSchema.parse(req.body);
    const { animalId, donorName, donorEmail, amount } = validatedData;

    // Check if animal exists
    const animal = await AnimalModel.findById(animalId);
    if (!animal) {
      res.status(404).json({
        success: false,
        message: "Animal not found",
      });
      return;
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save donation record
    const donation = new DonationModel({
      animalId,
      donorName,
      donorEmail,
      amount,
      razorpayOrderId: order.id,
      status: "pending",
    });

    await donation.save();

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        donationId: donation._id,
        keyId: process.env.RAZORPAY_KEY_ID, // Send key ID to frontend
      },
    });
  } catch (error) {
    console.error("Error creating donation order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create donation order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Check if environment variables are set
  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.error("Missing Razorpay secret key");
    res.status(500).json({
      success: false,
      message: "Payment verification service configuration error",
    });
    return;
  }

  try {
    const validatedData = PaymentVerificationSchema.parse(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      validatedData;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
      return;
    }

    // Update donation record
    const donation = await DonationModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "completed",
      },
      { new: true }
    );

    if (!donation) {
      res.status(404).json({
        success: false,
        message: "Donation not found",
      });
      return;
    }

    // Update animal's raised amount
    await AnimalModel.findByIdAndUpdate(donation.animalId, {
      $inc: { raisedAmount: donation.amount },
    });

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: donation,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDonationsByAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { animalId } = req.params;
    const donations = await DonationModel.find({
      animalId,
      status: "completed",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
};
