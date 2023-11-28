// class AirplaneService{

// }
const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const airplaneRepository = new AirplaneRepository();
const { AppError } = require("../utils/errors/app-error");
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "TypeError") {
      throw new AppError(
        "Error occured in Creation of Airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
}

module.exports = {
  createAirplane,
};
