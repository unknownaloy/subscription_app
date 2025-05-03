import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

export const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(DB_URI);

    console.log(
      `mongodb - connectToDatabase -- Connected to database in ${NODE_ENV} mode`
    );

    console.log(
      "mongodb - connectToDatabase -- connect.connection.host ->",
      connect.connection.host
    );
    console.log(
      "mongodb - connectToDatabase -- connect.connection.name ->",
      connect.connection.name
    );
  } catch (err) {
    console.log("mongodb - connectToDatabase -- err ->", err);
    process.exit(1);
  }
};
