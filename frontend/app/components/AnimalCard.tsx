import { Link } from "react-router";
import type { Animal } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  formatCurrency,
  calculateProgress,
  capitalizeFirst,
} from "../lib/utils";
import { urgencyColors } from "../types";

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const progress = calculateProgress(animal.raisedAmount, animal.targetAmount);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl text-black">{animal.name}</CardTitle>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              urgencyColors[animal.urgencyLevel]
            }`}
          >
            {capitalizeFirst(animal.urgencyLevel)} Priority
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-3">{animal.description}</p>

        {animal.medicalNeeds && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">
              Medical Needs:
            </h4>
            <p className="text-sm text-gray-600">{animal.medicalNeeds}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex gap-4 text-sm">
            <span className="text-gray-600">Raised:</span>
            <span className="font-medium text-black">
              {formatCurrency(animal.raisedAmount || 0)}
            </span>
          </div>

          {animal.targetAmount !== undefined && (
            <>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">Target:</span>
                <span className="font-medium text-black">
                  {formatCurrency(animal.targetAmount)}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-right text-xs text-gray-500">
                {progress.toFixed(1)}% raised
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/animal/${animal._id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Donate Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
