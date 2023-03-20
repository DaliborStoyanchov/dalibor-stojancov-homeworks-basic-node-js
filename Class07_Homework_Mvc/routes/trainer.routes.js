import { Router } from "express";
import { TrainerController } from "../controllers/trainer.controller.js";

export const trainerRouter = Router();

// 1. Get all trainers
trainerRouter.get("/", TrainerController.getAllTrainers);

// 2. Get trainer by ID
trainerRouter.get("/:id", TrainerController.getTrainerById);

// 3. Create trainer
trainerRouter.post("/", TrainerController.createTrainer);

// 4. Update a trainer
trainerRouter.patch("/:id", TrainerController.updateTrainer);

// 5. Delete all trainers
trainerRouter.delete("/all", TrainerController.deleteAllTrainers);

// 6. Delete trainer
trainerRouter.delete("/:id", TrainerController.deleteTrainer);
