const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name || !req.body.code || !req.body.cityId) {
    let missingFields = [];
    if (!req.body.name) {
      missingFields.push("name");
    }
    if (!req.body.code) {
      missingFields.push("code");
    }
    if (!req.body.cityId) {
      missingFields.push("cityId");
    }
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      [`Required field(s) ${missingFields} are not present`],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  validateCreateRequest,
};
