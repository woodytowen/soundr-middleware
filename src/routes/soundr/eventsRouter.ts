import express from 'express';
import { aggregateEventsController } from '../../controllers/aggergateEventsController';
import { artistController } from '../../controllers/soundrArtistController';

export const eventsRouter = express.Router();
export const artistRouter = express.Router();

eventsRouter.get('/events', async (req, res, next) => {
  try {
    await aggregateEventsController(req, res);
  } catch (err) {
    next(err);
  }
});

artistRouter.get('/artists', async (req, res, next) => {
  try {
    await artistController(req, res);
  } catch (err) {
    next(err);
  }
});
