const CrudRepository = require("./crud-repositories");
const { Flight, Airport, Airplane } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort) {
    const response = await this.model.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airport,
          as: "arrivalAirportId_code",
          required: true,
        },
        {
          model: Airport,
          as: "departureAirportId_code",
          required: true,
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
