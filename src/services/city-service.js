const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    // if (error.name == "SequelizeValidationError") {
    //   let explanation = [];
    //   error.errors.forEach((err) => {
    //     explanation.push(err.message);
    //   });
    //   console.log(explanation);
    //   throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    // }
    if ((error.name = "SequelizeUniqueConstraintError")) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      //console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Error occured in Creation of City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getCities() {
  try {
    const allCity = await cityRepository.getAll();
    return allCity;
  } catch (error) {
    throw new AppError(
      "Error occured in all retrieving all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    throw new AppError(
      "Error occured in retrieving an city with the given id",
      error.statusCode
    );
  }
}
async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured in deleting an city with the given id",
      error.statusCode
    );
  }
}
async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    console.log(city);
    return city;
  } catch (error) {
    throw new AppError(
      "City with the given id does not exists.",
      error.statusCode
    );
  }
}
module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  destroyCity,
};
