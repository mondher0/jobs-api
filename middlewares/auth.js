const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/unauthorized");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (error) {
    throw new Unauthorized("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
