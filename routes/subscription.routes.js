import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (_, res) =>
  res.send({ title: "Welcome to the subscription route" })
);

export default subscriptionRouter;
