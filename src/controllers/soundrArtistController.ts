import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getArtist } from '../services/skiddle/skiddleService';

/**
 * Controller for handling artist-related requests.
 *
 * Test Use Only Right Now
 */
export const artistController = async (req: Request, res: Response) => {
  try {
    const name = typeof req.query.name === 'string' ? req.query.name.trim() : '';

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
    }

    const data = await getArtist(name);

    res.status(StatusCodes.OK).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('ArtistController error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
