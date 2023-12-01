const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createFlight(req, res) {
  console.log(req.body);
  try {
    const flight = await FlightService.createFlight(req.body);
    console.log(flight);
    SuccessResponse.message = "Successfully created an flight";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.message = "Something went wrong while creating an flight";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAllFlights(req, res) {
  try {
    const flight = await FlightService.getAllFlights(req.query);
    console.log(flight);
    SuccessResponse.message = "List of flights with the provided filter.";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.message = "Something went wrong while retrieving flights.";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createFlight,
  getAllFlights,
};
