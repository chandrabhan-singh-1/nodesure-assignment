import { Request, Response } from "express";
import { AnimalModel } from "../models/Animal";
import { AnimalSchema } from "../types/index";

export const getAllAnimals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const animals = await AnimalModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: animals,
    });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch animals",
    });
  }
};

export const getAnimalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const animal = await AnimalModel.findById(id);

    if (!animal) {
      res.status(404).json({
        success: false,
        message: "Animal not found",
      });
      return;
    }

    res.json({
      success: true,
      data: animal,
    });
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch animal",
    });
  }
};

export const createAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = AnimalSchema.parse(req.body);
    const animal = new AnimalModel(validatedData);
    const savedAnimal = await animal.save();

    res.status(201).json({
      success: true,
      data: savedAnimal,
    });
  } catch (error) {
    console.error("Error creating animal:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create animal",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
