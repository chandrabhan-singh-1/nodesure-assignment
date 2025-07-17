"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimal = exports.getAnimalById = exports.getAllAnimals = void 0;
const Animal_1 = require("../models/Animal");
const index_1 = require("../types/index");
const getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal_1.AnimalModel.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: animals,
        });
    }
    catch (error) {
        console.error("Error fetching animals:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch animals",
        });
    }
};
exports.getAllAnimals = getAllAnimals;
const getAnimalById = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal_1.AnimalModel.findById(id);
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
    }
    catch (error) {
        console.error("Error fetching animal:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch animal",
        });
    }
};
exports.getAnimalById = getAnimalById;
const createAnimal = async (req, res) => {
    try {
        const validatedData = index_1.AnimalSchema.parse(req.body);
        const animal = new Animal_1.AnimalModel(validatedData);
        const savedAnimal = await animal.save();
        res.status(201).json({
            success: true,
            data: savedAnimal,
        });
    }
    catch (error) {
        console.error("Error creating animal:", error);
        res.status(400).json({
            success: false,
            message: "Failed to create animal",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createAnimal = createAnimal;
//# sourceMappingURL=animalController.js.map