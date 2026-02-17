import "./configs/env.ts";

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import connectDb from "./configs/db.ts";
import AuthRouter from "./routes/AuthRoutes.ts";
import thumbnailRoutes from "./routes/ThumbnailRoutes.ts";
import contactRoutes from "./routes/ContactRoutes.ts";

const startServer = async () => {
  await connectDb();

  const app = express();

  // ✅ CORS (allow local dev frontends)
  app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
