import express from 'express';
import { eventsController } from '../../controllers/skiddle/eventsController';
import { artistController } from '../../controllers/skiddle/artistController';

export const eventsRouter = express.Router();
export const artistRouter = express.Router();

eventsRouter.get('/events', async (req, res, next) => {
  try {
    await eventsController(req, res);
  } catch (err) {
    next(err);
  }
});

artistRouter.get('/artist', async (req, res, next) => {
  try {
    await artistController(req, res);
  } catch (err) {
    next(err);
  }
});
