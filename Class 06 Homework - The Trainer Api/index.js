import express from "express";
import {
  createTrainer,
  deleteAllTrainers,
  deleteTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from "./trainer.js";

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();

    return res.json(trainers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    const foundTrainer = await getTrainerById(trainerId);

    res.json(foundTrainer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, coursesFinished } =
      req.body;

    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("Invalid data for creating trainer");

    const newTrainer = await createTrainer(
      firstName,
      lastName,
      email,
      timeEmployed,
      coursesFinished
    );

    return res.status(201).json(newTrainer);
  } catch (error) {
    console.log(error);

    return res.status(400).send(error.message);
  }
});

app.patch("/trainers/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const trainerId = req.params.id;

    if (updateData.id) throw new Error("Invalid Update");

    const updatedTrainers = await updateTrainer(trainerId, updateData);

    return res.status(200).send(updatedTrainers);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);

    res.status(200).send({ msg: "Deletion success!" });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.delete("/trainers", async () => {
  try {
    await deleteAllTrainers();

    res.status(200).send({ msg: "Deletion success!" });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
