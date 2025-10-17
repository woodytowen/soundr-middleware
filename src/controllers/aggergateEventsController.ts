import { aggregateSoundrEvents } from '../services/soundr/aggregateEventService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateAggregateEventRequest } from './utils/validateEventsRequest';

export const aggregateEventsController = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validation = validateAggregateEventRequest(req);

    if (!validation.success) {
      return res.status(validation.error!.statusCode).json({
        success: false,
        message: validation.error!.message,
      });
    }

    const soundrEventRequest = validation.data!;
    const events = await aggregateSoundrEvents(soundrEventRequest);

    if (!events || events.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No events found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      resultsLength: events.length,
      events,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
