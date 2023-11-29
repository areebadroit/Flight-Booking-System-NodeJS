const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createAirplane(req, res) {
  console.log(req.body);
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    console.log(airplane);
    SuccessResponse.message = "Successfully created an airplane";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.message = "Something went wrong while creating an airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirplanes(req, res) {
  try {
    const allAirplane = await AirplaneService.getAirplanes();
    SuccessResponse.message = "Listing all airplanes";
    SuccessResponse.data = allAirplane;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while retrieving all airplanes";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.message = "Listing all airplanes";
    SuccessResponse.data = airplane;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while retrieving airplane with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function destroyAirplane(req, res) {
  try {
    const response = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.message = `Airplane with id ${req.params.id} deleted.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while deleting airplane with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function updateAirplane(req, res) {
  try {
    const response = await AirplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    SuccessResponse.message = `Airplane with id ${req.params.id} updated.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while updating airplane with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
