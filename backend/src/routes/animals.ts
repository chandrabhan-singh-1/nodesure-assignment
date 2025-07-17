import { Router } from "express";
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
} from "../controllers/animalController";

const router = Router();

// GET /api/animals - Get all animals
router.get("/", getAllAnimals);

// GET /api/animals/:id - Get animal by ID
router.get("/:id", getAnimalById);

// POST /api/animals - Create new animal (for seeding data)
router.post("/", createAnimal);

export default router;
