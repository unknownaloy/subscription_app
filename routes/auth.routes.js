import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (_, res) => res.send({ title: "This is the auth route" }));

export default authRouter;
