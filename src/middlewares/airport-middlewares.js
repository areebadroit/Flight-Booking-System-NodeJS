const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating an airport";
    ErrorResponse.error = new AppError(
      ["All required fields are not present"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  validateCreateRequest,
};
