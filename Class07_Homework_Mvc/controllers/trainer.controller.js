import { request } from "express";
import { TrainerModel } from "../models/trainer.model.js";

export class TrainerController {
  // 1. Get all trainers
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerModel.getAllTrainers();

      return res.json(trainers);
    } catch {
      console.log(error);

      return res.status(500).json({ msg: error.message });
    }
  }

  // 2. Get trainer by ID
  static async getTrainerById(req, res) {
    try {
      const { id: trainerId } = req.params;
      const foundTrainer = await TrainerModel.getTrainerById(trainerId);

      return res.json(foundTrainer);
    } catch (error) {
      console.log(error);

      return res.status(404).json({ msg: error.message });
    }
  }

  // 3. Create a new trainer
  static async createTrainer(req, res) {
    try {
      const trainerData = req.body;
      const newTrainer = await TrainerModel.createTrainer(trainerData);

      return res.status(201).json(newTrainer);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 4. Update trainer
  static async updateTrainer(req, res) {
    try {
      const { id: trainerId } = req.params;
      const updateData = req.body;

      const updatedTrainer = await TrainerModel.updateTrainer(
        trainerId,
        updateData
      );

      return res.json(updatedTrainer);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 5. Delete all trainers
  static async deleteAllTrainers(req, res) {
    try {
      await TrainerModel.deleteAllTrainers();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // 6. Delete trainer by id
  static async deleteTrainer(req, res) {
    try {
      const { id: trainerId } = req.params;

      await TrainerModel.deleteTrainer(trainerId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
}
