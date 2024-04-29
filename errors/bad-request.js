
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
