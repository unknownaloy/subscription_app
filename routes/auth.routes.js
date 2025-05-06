import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/", (_, res) => res.send({ title: "This is the auth route" }));

authRouter.post("/signup", signup);

export default authRouter;
