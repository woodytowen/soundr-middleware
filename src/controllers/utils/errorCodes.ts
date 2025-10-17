import { StatusCodes } from 'http-status-codes';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';

export interface ValidationEventError {
  statusCode: number;
  message: string;
}

export interface ValidateEventResult {
  success: boolean;
  data?: SoundrEventRequest;
  error?: ValidationEventError;
}

const VALIDATION_ERRORS: Record<string, ValidationEventError> = {
  INVALID_OFFSET: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Offset must be a non-negative number',
  },
  INVALID_LOCATION_DATA: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid location data. Longitude, latitude, and radius must be valid numbers.',
  },
  INVALID_LONGITUDE: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Longitude must be between -180 and 180.',
  },
  INVALID_LATITUDE: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Latitude must be between -90 and 90.',
  },
  INVALID_RADIUS: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Radius must be greater than 0.',
  },
} as const;

export const buildErrorResponse = (errorType: keyof typeof VALIDATION_ERRORS): ValidateEventResult => ({
  success: false,
  error: VALIDATION_ERRORS[errorType],
});
