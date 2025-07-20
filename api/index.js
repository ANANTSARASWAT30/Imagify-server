import express from "express";
import cors from "cors";
import "dotenv/config";
// Update import paths if config/routes are still in /server
import connectDB from "../server/config/mongodb.js";
import userRouter from "../server/routes/user.route.js";
import imageRouter from "../server/routes/image.route.js";

const app = express();

// Handle favicon requests to prevent 404
app.get("/favicon.ico", (req, res) => {
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

// Root route - add this before other routes
app.get("/", (req, res) => {
  res.json({
    message: "Imagify API is running",
    status: "active",
    timestamp: new Date().toISOString(),
  });
});

// Set up routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Catch-all route for unhandled requests
app.use("*", (req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Database initialization
let dbInitialized = false;

const initializeDB = async () => {
  if (!dbInitialized) {
    try {
      await connectDB();
      console.log("MongoDB connected successfully");
      dbInitialized = true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
};

// For local development
if (process.env.NODE_ENV !== "production") {
  initializeDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(console.error);
} else {
  // For Vercel, initialize DB on first request
  initializeDB().catch(console.error);
}

// Export Vercel handler
export default async (req, res) => {
  await initializeDB();
  app(req, res);
};
