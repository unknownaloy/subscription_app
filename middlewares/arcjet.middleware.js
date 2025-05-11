import { aj } from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { responseHandler } from "../utils/response.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return responseHandler(
          res,
          { success: false, message: "Too many requests" },
          429
        );
      } else if (decision.reason.isBot()) {
        return responseHandler(
          res,
          { success: false, message: "No bots allowed" },
          403
        );
      } else {
        return responseHandler(
          res,
          { success: false, message: "Access denied" },
          403
        );
      }
    } else if (decision.results.some(isSpoofedBot)) {
      res.end(JSON.stringify({ error: "Forbidden" }));

      return responseHandler(
        res,
        { success: false, message: "Access denied" },
        403
      );
    }

    next();
  } catch (err) {
    console.log(`arcjetMiddleware - err -- ${err}`);
    next(err);
  }
};
