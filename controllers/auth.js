const BadRequest = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

// register
const register = async (req, res) => {
  const { email, password, name } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequest("User with that email already exists");
  }
  if (!email || !password || !name) {
    throw new BadRequest("Please provide email and password and name");
  }
  const user = await User.create({ email, password, name });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    accessToken: token,
  });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Invalid email");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequest("Invalid password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
    accessToken: token,
  });
};

module.exports = {
  register,
  login,
};
