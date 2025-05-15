import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";
import { compare, hash } from "../utils/crypt.js";
import { responseHandler } from "../utils/response.js";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hash(password);

    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const data = newUser[0].toObject();
    data.userId = newUser._id;

    const token = jwt.sign({ userId: data.userId, name, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    session.commitTransaction();
    session.endSession();

    return responseHandler(res, {
      success: true,
      message: "User created",
      data: { token, user: data },
      statusCode: 201,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(`bitcoin - user -- ${user.id}`);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const data = user.toObject();
    data.userId = user._id;
    data.token = token;

    return responseHandler(res, {
      success: true,
      message: "User signed in successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};
