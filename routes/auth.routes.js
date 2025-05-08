import { Router } from "express";

import { signIn, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/", (_, res) => res.send({ title: "This is the auth route" }));

authRouter.post("/signup", signup);
authRouter.post("/signin", signIn);

export default authRouter;
