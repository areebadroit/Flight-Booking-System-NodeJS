const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
  try {
    const city = await CityService.createCity(req.body);
    SuccessResponse.message = "Successfully created a city";
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating an airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getCities(req, res) {
  try {
    const allCity = await CityService.getCities();
    SuccessResponse.message = "Listing all cities";
    SuccessResponse.data = allCity;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error)
    ErrorResponse.message = "Something went wrong while retrieving all cities";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);
    SuccessResponse.message = "City Retrieved";
    SuccessResponse.data = city;
    SuccessResponse.success = true;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while retrieving city with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function destroyCity(req, res) {
  try {
    const response = await CityService.destroyCity(req.params.id);
    SuccessResponse.message = `City with id ${req.params.id} deleted.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while deleting city with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function updateCity(req, res) {
  try {
    const response = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.message = `City with id ${req.params.id} updated.`;
    SuccessResponse.data = response;
    SuccessResponse.success = true;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while updating city with the given id";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  destroyCity,
};
