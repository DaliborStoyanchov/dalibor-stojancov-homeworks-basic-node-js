import { Router } from "express";
import { authRouter } from "../routes/auth.routes.js";
import { trainerRouter } from "../routes/trainer.routes.js";

export const globalRouter = Router();

globalRouter.use("/", authRouter);
globalRouter.use("/trainers", trainerRouter);
