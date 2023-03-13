import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const trainersPath = path.join(__dirname, "data", "trainer.json");

const saveTrainer = async (trainers) => {
  await DataService.saveJSONFile(trainersPath, trainers);
};

export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(trainersPath);

  return trainers;
};

export const getTrainerById = async (trainerId) => {
  const trainers = await getAllTrainers();

  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

  if (!foundTrainer) throw new Error("Trainer not found");

  return foundTrainer;
};

export const createTrainer = async (
  firstName,
  lastName,
  email,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();

  const trainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    timeEmployed,
    coursesFinished,
    isCurrentlyTeaching: false,
  };

  const updateTrainer = [...trainers, trainer];

  await saveTrainer(updateTrainer);

  return trainer;
};

export const updateTrainer = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();
  const foundTrainer = await getTrainerById(trainerId);

  const updateTrainer = {
    ...foundTrainer,
    ...updateData,
  };

  const updateTrainers = trainers.map((trainer) => {
    if (trainer.id === updateTrainer.id) return updateTrainer;

    return trainer;
  });

  await saveTrainers(updateTrainer);

  return updateTrainers;
};

export const deleteTrainer = async (trainerId) => {
  const trainers = await getAllTrainers();

  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerId
  );

  if (updatedTrainers.length === trainers.length)
    throw new Error("Trainer not found");

  await saveTrainers(updateTrainer);
};

export const deleteAllTrainers = async () => {
  const trainers = await getAllTrainers();

  if (trainers.length > 0) {
    throw new Error("Trainer not found");
  }

  trainers = [];

  return trainers;
};
