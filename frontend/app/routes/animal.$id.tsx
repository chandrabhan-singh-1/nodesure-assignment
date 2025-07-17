import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { MetaFunction } from "react-router";
import { useAnimalStore } from "../store/useAnimalStore";
import { DonationModal } from "../components/DonationModal";
import {
  formatCurrency,
  calculateProgress,
  capitalizeFirst,
  formatDate,
} from "../lib/utils";
import { urgencyColors } from "../types";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Animal Details - Animal Welfare Portal" },
    {
      name: "description",
      content:
        "Learn more about this animal and make a donation to help with their medical needs",
    },
  ];
};

export default function AnimalDetail() {
  const { id } = useParams();
  const { selectedAnimal, loading, error, selectAnimal } = useAnimalStore();
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    if (id) {
      selectAnimal(id);
    }
  }, [id, selectAnimal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading animal details...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedAnimal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            {error || "Animal not found"}
          </div>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(
    selectedAnimal.raisedAmount,
    selectedAnimal.targetAmount
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to Animals
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedAnimal.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    urgencyColors[selectedAnimal.urgencyLevel]
                  }`}
                >
                  {capitalizeFirst(selectedAnimal.urgencyLevel)} Priority
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedAnimal.description}
              </p>
            </div>

            {selectedAnimal.medicalNeeds && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-black">
                    Medical Needs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800">{selectedAnimal.medicalNeeds}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-black">
                  Fundraising Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-800">Raised:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(selectedAnimal.raisedAmount)}
                  </span>
                </div>

                {selectedAnimal.targetAmount && (
                  <>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-800">Target:</span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(selectedAnimal.targetAmount)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{progress.toFixed(1)}% raised</span>
                        <span>
                          {formatCurrency(
                            selectedAnimal.targetAmount -
                              selectedAnimal.raisedAmount
                          )}{" "}
                          remaining
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={() => setShowDonationModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-gray-500">
                  <p>Added on: {formatDate(selectedAnimal.createdAt)}</p>
                  <p className="mt-1">
                    Last updated: {formatDate(selectedAnimal.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showDonationModal && (
        <DonationModal
          animal={selectedAnimal}
          isOpen={showDonationModal}
          onClose={() => setShowDonationModal(false)}
        />
      )}
    </div>
  );
}
