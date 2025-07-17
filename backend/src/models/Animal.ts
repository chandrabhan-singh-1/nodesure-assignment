import mongoose, { Schema, Document } from "mongoose";
import { Animal } from "../types/index";

export interface IAnimal extends Omit<Animal, "_id">, Document {}

const animalSchema = new Schema<IAnimal>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    medicalNeeds: {
      type: String,
    },
    urgencyLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    targetAmount: {
      type: Number,
      min: 0,
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const AnimalModel = mongoose.model<IAnimal>("Animal", animalSchema);
