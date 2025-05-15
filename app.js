import cookieParser from "cookie-parser";
import express from "express";

import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

connectToDatabase();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Service App");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Service App is running on http://localhost:${PORT}`
  );
});

export default app;
