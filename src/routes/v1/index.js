const express = require("express");

const airplaneRoutes = require("./airplane-router");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-router");
const flightRoutes = require("./flight-router");

const router = express.Router();
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);
module.exports = router;
