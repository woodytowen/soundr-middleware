import { getEventsSkiddle } from '../../services/skiddle/skiddleService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const eventsController = async (req: Request, res: Response) => {
  try {
    const data = await getEventsSkiddle({ genre: ['8', '80'] });

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No events found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
