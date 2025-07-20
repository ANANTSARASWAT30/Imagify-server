import app from "../server.js";

// Vercel serverless function handler
export default async function handler(req, res) {
    // Handle the request with Express app
    return app(req, res);
}