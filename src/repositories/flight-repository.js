const CrudRepository = require("./crud-repositories");
const { Flight, Airport, Airplane } = require("../models");
const db = require("../models");

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
  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(
      `SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
    ); //Getting lock on this particular row
    const flight = await Flight.findByPk(flightId);
    if (parseInt(dec)) {
      const response = await flight.decrement("totalSeats", { by: seats });
      console.log(response);
      return response;
    } else {
      const response = await flight.increment("totalSeats", { by: seats });
      return response;
    }
  }
}
module.exports = FlightRepository;
