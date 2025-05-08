import { User } from "../models/user.model.js";
import { responseHandler } from "../utils/response.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return responseHandler(res, {
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return responseHandler(res, {
      success: true,
      message: "User fetch successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
