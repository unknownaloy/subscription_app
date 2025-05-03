import express from "express";

import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

connectToDatabase();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Service App");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Service App is running on http://localhost:${PORT}`
  );
});

export default app;
