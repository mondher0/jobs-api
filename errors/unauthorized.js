const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
