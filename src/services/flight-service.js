const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");
const { Op } = require("sequelize");
const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      "Error occured in Creation of Flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllFlights(query) {
  //query trips=MUM-DEL
  let customFilter = {};
  let sortFilter = [];
  let endingTripTime = " 23:59:00";
  console.log(query.tripDate, query.tripDate + endingTripTime);
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    let startTime = new Date(query.tripDate);
    let endTime = new Date(query.tripDate + endingTripTime);
    customFilter.departureTime = {
      [Op.between]: [startTime, endTime],
    };
  }
  if (query.sort) {
    const criterias = query.sort.split(",");
    const sortFilters = criterias.map((criteria) => criteria.split("_"));
    sortFilter = sortFilters;
  }
  console.log(sortFilter);
  try {
    const flight = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flight;
  } catch (error) {
    throw new AppError(
      "Error occured in retrieving flights.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
  getAllFlights,
};
