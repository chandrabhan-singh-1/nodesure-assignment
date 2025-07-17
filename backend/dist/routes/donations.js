"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donationController_1 = require("../controllers/donationController");
const router = (0, express_1.Router)();
// POST /api/donations/create-order - Create Razorpay order for donation
router.post("/create-order", donationController_1.createDonationOrder);
// POST /api/donations/verify-payment - Verify Razorpay payment
router.post("/verify-payment", donationController_1.verifyPayment);
// GET /api/donations/animal/:animalId - Get donations for specific animal
router.get("/animal/:animalId", donationController_1.getDonationsByAnimal);
exports.default = router;
//# sourceMappingURL=donations.js.map