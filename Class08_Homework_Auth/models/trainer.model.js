import { DataService } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";

const trainersPath = pathBuilder(["..", "data", "trainers.json"]);

export class TrainerModel {
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(trainersPath, trainers);
  }

  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(trainersPath);

    return trainers;
  }

  static async getTrainerById(trainerId) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Could not find trainer");

    return foundTrainer;
  }

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

  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

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
