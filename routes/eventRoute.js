import express from "express";
const eventRouter = express.Router();
import { createEvent, getStats, getConversionRate, getUserEngagement } from "../controllers/eventController.js";

eventRouter.post('/', createEvent);
eventRouter.get('/stats', getStats);
eventRouter.get('/engagement', getUserEngagement);
eventRouter.get('/conversion-rate', getConversionRate);

export default eventRouter;