import { buildErrorResponse, ValidateEventResult } from './errorCodes';

/**
 * Validates the incoming request for aggregating events.
 *
 * Rules:
 * Genre can be undefined - Reason: Its for a filter on the front-end
 * Location can be undefined - Reason: Its only if the user allows the location services
 * Offset: Has to be checked regardless for Pagination
 *
 * @param req The incoming request object.
 * @returns A ValidateEventResult indicating the success or failure of the validation.
 */
export const validateAggregateEventRequest = (req: any): ValidateEventResult => {
  const genreNames = Array.isArray(req.body.genres) ? req.body.genres : req.body.genres ? [req.body.genres] : [];

  const offset = parseInt(req.body.offset) || 0;
  if (offset < 0) {
    return buildErrorResponse('INVALID_OFFSET');
  }

  const hasLocationData =
    req.body.location !== undefined &&
    (req.body.location?.longitude !== undefined ||
      req.body.location?.latitude !== undefined ||
      req.body.location?.radius !== undefined);

  let location = null;

  if (hasLocationData) {
    const parsedLocation = req.body.location;
    const longitude = parseFloat(parsedLocation.longitude);
    const latitude = parseFloat(parsedLocation.latitude);
    const radius = parseFloat(parsedLocation.radius);

    if (isNaN(longitude) || isNaN(latitude) || isNaN(radius)) {
      return buildErrorResponse('INVALID_LOCATION_DATA');
    }

    if (longitude < -180 || longitude > 180) {
      return buildErrorResponse('INVALID_LONGITUDE');
    }

    if (latitude < -90 || latitude > 90) {
      return buildErrorResponse('INVALID_LATITUDE');
    }

    if (radius <= 0) {
      return buildErrorResponse('INVALID_RADIUS');
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
