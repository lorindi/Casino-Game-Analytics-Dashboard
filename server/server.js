import 'dotenv/config'; 
import mongoose from "mongoose";
import express from "express";
const server = express();
server.get("/", (req, res) => {
  res.send("Restful service");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
    