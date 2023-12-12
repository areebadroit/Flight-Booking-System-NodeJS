const CrudRepository = require("./crud-repositories");
const { Flight, Airport, Airplane } = require("../models");
const db = require("../models");
const { addRowLockOnFlight } = require("./queries");

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
    const transaction = await db.sequelize.transaction();
    await db.sequelize.query(addRowLockOnFlight(flightId)); //Getting lock on this particular row
    try {
      const flight = await Flight.findByPk(flightId);
      if (+dec) {
        const response = await flight.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
        console.log(response);
        // transaction.commit();
        return response;
      } else {
        const response = await flight.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
        //transaction.commit();
        return response;
      }
    } catch (error) {
      //transaction.rollback();
      return error;
    }
  }
}
module.exports = FlightRepository;
