import { Subscription } from "../models/subscription.model.js";
import { responseHandler } from "../utils/response.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user._id,
    });

    return responseHandler(
      res,
      {
        success: true,
        message: "Subscription created successfully",
        data: subscription,
      },
      201
    );
  } catch (err) {
    next(err);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ userId: req.params.id });

    return responseHandler(res, {
      success: true,
      message: "success",
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};
