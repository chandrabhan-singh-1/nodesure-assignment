"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const animalController_1 = require("../controllers/animalController");
const router = (0, express_1.Router)();
// GET /api/animals - Get all animals
router.get("/", animalController_1.getAllAnimals);
// GET /api/animals/:id - Get animal by ID
router.get("/:id", animalController_1.getAnimalById);
// POST /api/animals - Create new animal (for seeding data)
router.post("/", animalController_1.createAnimal);
exports.default = router;
//# sourceMappingURL=animals.js.map