import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (_, res) => {
  res.send({ title: "Fetch all users" });
});

export default userRouter;
