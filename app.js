import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Service App");
});

app.listen(3000, () => {
  console.log("Subscription Service App is running on http://localhost:3000");
});

export default app;
