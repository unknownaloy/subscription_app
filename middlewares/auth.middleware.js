import jwt from "jsonwebtoken";

import { responseHandler } from "../utils/response.js";
import { JWT_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return responseHandler(
        res,
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return responseHandler(
        res,
        { success: false, message: "Unauthorized" },
        404
      );
    }

    req.user = user;

    next();
  } catch (err) {
    return responseHandler(
      res,
      { success: false, message: "Unauthorized", error: err.message },
      404
    );
  }
};
