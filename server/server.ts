import "./configs/env.js";

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import connectDb from "./configs/db.js";
import AuthRouter from "./routes/AuthRoutes.js";
import thumbnailRoutes from "./routes/ThumbnailRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

const startServer = async () => {
  await connectDb();

  const app = express();

  // ✅ CORS (allow local dev frontends)
 app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://thumbnail-generator-topaz.vercel.app',
    'https://thumbnail-generator-topaz.vercel.app/'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

  app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

  // ✅ JSON body parsing
  app.use(express.json({ limit: '50mb' }));

  // ✅ ROUTES
  app.use("/", AuthRouter);
  app.use("/contact", contactRoutes);
  app.use("/thumbnail", thumbnailRoutes);

  app.get("/", (_req: Request, res: Response) => {
    res.send("Server is Live!");
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
