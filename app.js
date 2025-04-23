import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Service App");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Service App is running on http://localhost:${PORT}`
  );
});

export default app;
