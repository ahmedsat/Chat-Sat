const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const register = async function (req, res) {
  const user = await User.create(req.body);

  token = await user.getToken();

  res.status(StatusCodes.OK).json({ username, token });
};

const login = async function (req, res) {
  const {
    body: { username, password },
  } = req;

  if (!username || !password)
    throw new BadRequestError("username and password are required");

  const user = await User.findOne({ username });

  if (!user) throw new NotFoundError(`User ${username} not found`);

  isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("wrong password");

  token = await user.getToken();

  res.status(StatusCodes.OK).json({ username, token });
};

module.exports = {
  login,
  register,
};
