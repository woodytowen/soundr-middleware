import { eventsController } from '../../controllers/ticketMaster/eventsController';
import express from 'express';

export const eventsRouter = express.Router();

eventsRouter.get('/events', async (req, res, next) => {
  try {
    await eventsController(req, res);
  } catch (err) {
    next(err);
  }
});
