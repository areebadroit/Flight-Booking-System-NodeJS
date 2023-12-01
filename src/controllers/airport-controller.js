const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createAirport(req, res) {
  console.log(req.body);
  try {
    const airport = await AirportService.createAirport(req.body);
    console.log(airport);
    SuccessResponse.message = "Successfully created an airport";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirports(req, res) {
  try {
    const allAirport = await AirportService.getAirports();
    SuccessResponse.message = "Listing all airports";
    SuccessResponse.data = allAirport;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while retrieving all airports";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.message = `Listing airport with id:${req.params.id}`;
    SuccessResponse.data = airport;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while retrieving airport with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = `Airport with id ${req.params.id} deleted.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while deleting airport with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function updateAirport(req, res) {
  try {
    const response = await AirportService.updateAirport(
      req.params.id,
      req.body
    );
    SuccessResponse.message = `Airport with id ${req.params.id} updated.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while updating airport with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
