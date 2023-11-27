const express = require("express");
const { InfoController } = require("../../controllers");

const router = express.Router();
// router.get("/info", (req, res) => {
//   return res.json({ message: "OK" });
// });
router.get("/info", InfoController.info);
module.exports = router;
