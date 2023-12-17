const express = require("express");

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json()); //Helps to parse the incoming request body as json
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/flightsservice/api", apiRoutes);
app.get("/flightsservice/home", (req, res) => {
  console.log(req);
  return res.json({ msg: "ok" });
});
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server started at PORT: ${ServerConfig.PORT}`);
  Logger.info("Server up and running.");
  // const { City, Airport } = require("../src/models");
  // const city = City.create({
  //   name: "Noida",
  // });
  //const city = await City.findByPk(16);
  // console.log(city);
  // city.createAirport({
  //   name: "Kempegowda International Airport",
  //   code:"BLR"
  // })
  // const airport = await Airport.findByPk(5);
  // city.removeAirport(airport);
  // const city = await City.destroy({
  //   where: {
  //     id: 16,
  //   },
  // });
  // console.log(city)
});
