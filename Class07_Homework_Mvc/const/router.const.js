import { Router } from "express";
import { trainerRouter } from "../routes/trainer.routes.js";

export const globalRouter = Router();

globalRouter.use("/trainers", trainerRouter);
