import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
dotenv.config();

const runServer = async () => {
  try {
    const DB_HOST = process.env.DB_HOST;
    await mongoose.connect(DB_HOST);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runServer();
