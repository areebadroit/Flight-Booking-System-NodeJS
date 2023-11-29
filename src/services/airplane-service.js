// class AirplaneService{

// }
const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
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
      "Error occured in Creation of Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplanes() {
  try {
    const allAirplane = await airplaneRepository.getAll();
    return allAirplane;
  } catch (error) {
    throw new AppError(
      "Error occured in all retrieving all planes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    throw new AppError(
      "Error occured in retrieving an airplane with the given id",
      error.statusCode
    );
  }
}
async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured in deleting an airplane with the given id",
      error.statusCode
    );
  }
}
async function updateAirplane(id, data) {
  try {
    const airplane = await airplaneRepository.update(id, data);
    console.log(airplane);
    return airplane;
  } catch (error) {
    throw new AppError(
      "Airplane with the given id does not exists.",
      error.statusCode
    );
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
