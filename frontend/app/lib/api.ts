import type {
  Animal,
  DonationForm,
  ApiResponse,
  RazorpayOrder,
} from "../types";
import { AnimalSchema } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Animal API methods
  async getAllAnimals(): Promise<Animal[]> {
    const response = await this.request<ApiResponse>("/animals");
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch animals");
    }

    return response.data.map((animal: any) => {
      return AnimalSchema.parse(animal);
    });
  }

  async getAnimalById(id: string): Promise<Animal> {
    const response = await this.request<ApiResponse>(`/animals/${id}`);
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch animal");
    }

    // Validate and parse the animal object
    return AnimalSchema.parse(response.data);
  }

  // Donation API methods
  async createDonationOrder(
    animalId: string,
    donationData: DonationForm
  ): Promise<RazorpayOrder> {
    const response = await this.request<ApiResponse>(
      "/donations/create-order",
      {
        method: "POST",
        body: JSON.stringify({
          animalId,
          ...donationData,
        }),
      }
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to create donation order");
    }

    return response.data;
  }

  async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<void> {
    const response = await this.request<ApiResponse>(
      "/donations/verify-payment",
      {
        method: "POST",
        body: JSON.stringify(paymentData),
      }
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to verify payment");
    }
  }

  async getDonationsByAnimal(animalId: string): Promise<any[]> {
    const response = await this.request<ApiResponse>(
      `/donations/animal/${animalId}`
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch donations");
    }
    return response.data;
  }
}

export const apiService = new ApiService();
