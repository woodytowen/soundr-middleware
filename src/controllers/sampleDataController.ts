import { Request, Response } from 'express';
import { getSampleData } from '../services/sampleDataService';
import { StatusCodes } from 'http-status-codes';

export const fetchSampleData = async (req: Request, res: Response) => {
  try {
    const data = await getSampleData();

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
