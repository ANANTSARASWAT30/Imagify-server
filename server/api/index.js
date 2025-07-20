import app from "../server.js";

// Vercel serverless function handler
export default function handler(req, res) {
    return app(req, res);
}
