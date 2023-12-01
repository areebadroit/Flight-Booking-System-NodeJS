const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helper");

function validateCreateRequest(req, res, next) {
  if (
    !req.body.airplaneId ||
    !req.body.flightNumber ||
    !req.body.departureAirportId ||
    !req.body.arrivalAirportId ||
    !req.body.arrivalTime ||
    !req.body.departureTime ||
    !req.body.price ||
    !req.body.totalSeats ||
    !req.body.airlines
  ) {
    let missingFields = [];
    if (!req.body.airplaneId) {
      missingFields.push("airplaneId");
    }
    if (!req.body.flightNumber) {
      missingFields.push("flightNumber");
    }
    if (!req.body.departureAirportId) {
      missingFields.push("departureAirportId");
    }
    if (!req.body.arrivalAirportId) {
      missingFields.push("arrivalAirportId");
    }
    if (!req.body.arrivalTime) {
      missingFields.push("arrivalTime");
    }
    if (!req.body.departureTime) {
      missingFields.push("departureTime");
    }
    if (!req.body.price) {
      missingFields.push("price");
    }
    if (!req.body.totalSeats) {
      missingFields.push("totalSeats");
    }
    if (!req.body.airlines) {
      missingFields.push("airlines");
    }
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      [`Required field(s) ${missingFields} are not present`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!compareTime(req.body.arrivalTime, req.body.departureTime)) {
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      [`Arrival time should be greater than departure time.`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (req.body.departureAirportId == req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      [`Departure and Arrival airport cannot be same.`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
function validateGetAllFlightsRequest(req, res, next) {
  if (req.body.departureAirportId == req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      [`Departure and Arrival airport cannot be same.`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
    validateCreateRequest,
    validateGetAllFlightsRequest
};
