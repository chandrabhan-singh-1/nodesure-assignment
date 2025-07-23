import { useState } from "react";
import type { Animal, DonationForm } from "../types";
import { apiService } from "../lib/api";
import { useAnimalStore } from "../store/useAnimalStore";
import { formatCurrency } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

interface DonationModalProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

// Razorpay global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function DonationModal({ animal, isOpen, onClose }: DonationModalProps) {
  const [formData, setFormData] = useState<DonationForm>({
    donorName: "",
    donorEmail: "",
    amount: 500,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateAnimalRaisedAmount } = useAnimalStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleQuickAmount = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.donorName.trim() ||
      !formData.donorEmail.trim() ||
      formData.amount < 1
    ) {
      setError("Please fill all fields with valid values");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create Razorpay order
      const orderData = await apiService.createDonationOrder(
        animal._id,
        formData
      );

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error(
          "Razorpay not loaded. Please refresh the page and try again."
        );
      }

      const options = {
        key: orderData.keyId, // Use keyId from backend response
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Animal Welfare Portal",
        description: `Donation for ${animal.name}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Update local state
            updateAnimalRaisedAmount(animal._id, formData.amount);

            toast.success("Thank you for your donation! Payment successful.");
            onClose();
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.donorName,
          email: formData.donorEmail,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating donation:", error);
      setError(
        error instanceof Error ? error.message : "Failed to process donation"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <Card className="w-full h-[90%] overflow-y-auto max-w-md bg-white border border-gray-200 shadow-xl">
        <CardHeader className="bg-blue-50 border-b border-gray-200">
          <CardTitle className="flex items-center justify-between text-gray-900">
            Donate to {animal.name}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-white p-6">
          <form onSubmit={handleDonation} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="donorEmail"
                value={formData.donorEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${formData.amount === amount
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                        }`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="Enter custom amount"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <p className="text-sm text-blue-900 font-medium">
                Total Donation: {formatCurrency(formData.amount)}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                This will help provide medical care for {animal.name}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                Test Card (Copy Card Number)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-4 gap-2 font-medium text-yellow-700 border-b border-yellow-200 pb-1">
                  <span>Card Number</span>
                  <span>CVV</span>
                  <span>Expiry</span>
                  <span>OTP</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-yellow-800">
                  <span className="font-mono">4386 2894 0766 0153</span>
                  <span>Any 3 digits</span>
                  <span>Any future date</span>
                  <span>Any 6 digits</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Processing..." : "Donate Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
