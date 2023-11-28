"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init(
    {
      bookingNumber: { type: DataTypes.STRING, defaultValue: 0 },
      customer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookings",
    }
  );
  return Bookings;
};
