import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import imageRouter from "./routes/image.route.js";

const app = express();


app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// Set up routes immediately for serverless compatibility
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.get("/", (req, res) => res.send("API Working"));

// Initialize database connection
const initializeApp = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    // For local development only
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

// Initialize the app
initializeApp();

export default app;
