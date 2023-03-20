import { DataService } from "../services/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const trainersPath = path.join(__dirname, "..", "data", "trainer.json");

export class TrainerModel {
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(trainersPath, trainers);
  }

  // 1. Get all trainers
  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(trainersPath);

    return trainers;
  }

  // 2. Get trainers by ID
  static async getTrainerById(trainerId) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Could not find trainer");

    return foundTrainer;
  }

  // 3. Create a new trainer
  static async createTrainer(trainerData) {
    const trainers = await this.getAllTrainers();
    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("Email already exists");

    const newTrainer = {
      id: uuid(),
      ...trainerData,
    };
    const updatedTrainers = [...trainers, newTrainer];
    await this.saveTrainers(updatedTrainers);

    return newTrainer;
  }

  // 4. Update trainer
  static async updateTrainer(trainerId, updateData) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = await this.getTrainerById(trainerId);

    if (updateData.id) throw new Error("Invalid updates");

    const updatedTrainer = { ...foundTrainer, ...updateData };

    const updatedTrainers = trainers.map((trainer) =>
      trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    );

    await this.saveTrainers(updatedTrainers);

    return updatedTrainer;
  }

  // 5. Delete all trainers
  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

  // 6. Delete trainer by id
  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (updatedTrainers.length === trainers.length)
      throw new Error("Trainer not found");

    await this.saveTrainers(updatedTrainers);
  }
}
