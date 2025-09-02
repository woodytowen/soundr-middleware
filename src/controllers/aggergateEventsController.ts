import { aggregateSoundrEvents } from '../services/soundr/aggregateEventService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const aggregateEventsController = async (req: Request, res: Response) => {
  try {
    // Pass request params to aggregate service if needed
    const data = await aggregateSoundrEvents();

    if (!data || data.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No events found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
