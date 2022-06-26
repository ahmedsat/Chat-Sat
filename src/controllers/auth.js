const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const login = async function (req, res) {
  const {
    body: { username, password },
  } = req;

  if (!username || !password)
    throw new BadRequestError("username and password are required");

  const user = await User.findOne({ username });

  if (!user) throw new NotFoundError(`User ${req.user.username} not found`);

  isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("wrong password");

  token = await user.getToken();

  res.status(StatusCodes.OK).json({ username, token });
};

const register = function (req, res) {
  res.send("register");
};

module.exports = {
  login,
  register,
};
