const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const getAllUsers = async (req, res) => {
  let {
    user,
    query: { pageSize, page },
  } = req;
  // if (user.username != "AhmedSat")
  //   throw UnauthenticatedError("not authenticated");
  if (!page) page = 1;
  if (!pageSize) pageSize = 10;
  const users = await User.find({})
    .sort({ username: 1 })
    .select({ _id: 1, username: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  getAllUsers,
};
