import { StatusCodes } from 'http-status-codes';
import { SoundrEventRequest } from '../models/soundr/eventRequest';

interface ValidationError {
  statusCode: number;
  message: string;
}

interface ValidationResult {
  success: boolean;
  data?: SoundrEventRequest;
  error?: ValidationError;
}

export const validateAggregateEventRequest = (req: any): ValidationResult => {
  // Validate genres
  const genreNames = Array.isArray(req.body.genres) ? req.body.genres : req.body.genres ? [req.body.genres] : [];

  // Validate offset
  const offset = parseInt(req.body.offset) || 0;
  if (offset < 0) {
    return {
      success: false,
      error: {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Offset must be a non-negative number',
      },
    };
  }

  // Check if location data is provided
  const hasLocationData =
    req.body.longitude !== undefined || req.body.latitude !== undefined || req.body.radius !== undefined;

  let location = null;

  if (hasLocationData) {
    // If any location field is provided, validate all are present and valid
    const longitude = parseFloat(req.body.longitude);
    const latitude = parseFloat(req.body.latitude);
    const radius = parseFloat(req.body.radius);

    if (isNaN(longitude) || isNaN(latitude) || isNaN(radius)) {
      return {
        success: false,
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Invalid location data. Longitude, latitude, and radius must be valid numbers.',
        },
      };
    }

    if (longitude < -180 || longitude > 180) {
      return {
        success: false,
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Longitude must be between -180 and 180.',
        },
      };
    }

    if (latitude < -90 || latitude > 90) {
      return {
        success: false,
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Latitude must be between -90 and 90.',
        },
      };
    }

    if (radius <= 0) {
      return {
        success: false,
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Radius must be greater than 0.',
        },
      };
    }

    location = { longitude, latitude, radius };
  }

  // Return valid SoundrEventRequest
  return {
    success: true,
    data: {
      genre: genreNames,
      offset,
      location: location ? location : undefined,
    },
  };
};
