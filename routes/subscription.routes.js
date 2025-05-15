import { Router } from "express";

import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();
subscriptionRouter.use(authorize);

subscriptionRouter.post("/", createSubscription);
subscriptionRouter.get("/user/:id", getUserSubscriptions);

export default subscriptionRouter;
