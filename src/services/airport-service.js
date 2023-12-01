// class AirportService{

// }
const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      "Error occured in Creation of Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirports() {
  try {
    const allAirport = await airportRepository.getAll();
    return allAirport;
  } catch (error) {
    throw new AppError(
      "Error occured in all retrieving all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    throw new AppError(
      "Error occured in retrieving an airport with the given id",
      error.statusCode
    );
  }
}
async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured in deleting an airport with the given id",
      error.statusCode
    );
  }
}
async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    console.log(airport);
    return airport;
  } catch (error) {
    throw new AppError(
      "Airport with the given id does not exists.",
      error.statusCode
    );
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
