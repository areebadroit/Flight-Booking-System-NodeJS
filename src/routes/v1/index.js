const express = require("express");

const airplaneRoutes = require("./airplane-router");

const router = express.Router();
router.use("/airplanes", airplaneRoutes);
module.exports = router;
