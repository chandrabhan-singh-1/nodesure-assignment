import { Router } from "express";
import {
  createDonationOrder,
  verifyPayment,
  getDonationsByAnimal,
} from "../controllers/donationController";

const router = Router();

// POST /api/donations/create-order - Create Razorpay order for donation
router.post("/create-order", createDonationOrder);

// POST /api/donations/verify-payment - Verify Razorpay payment
router.post("/verify-payment", verifyPayment);

// GET /api/donations/animal/:animalId - Get donations for specific animal
router.get("/animal/:animalId", getDonationsByAnimal);

export default router;
