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


  // ✅ JSON body parsing
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ✅ ROUTES
  app.use("/", AuthRouter);
  app.use("/contact", contactRoutes);
  app.use("/thumbnail", thumbnailRoutes);

  app.get("/", (_req: Request, res: Response) => {
    res.json({ 
      success: true, 
      message: "Server is Live!",
      endpoints: {
        auth: "/test",
        login: "/login",
        register: "/register",
        thumbnails: "/thumbnail/my-generations",
        contact: "/contact/send"
      }
    });
  });

  // ✅ 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ 
      success: false, 
      message: `Route ${req.method} ${req.path} not found` 
    });
  });

  // ✅ Error handler
  app.use((err: any, req: Request, res: Response, next: any) => {
    console.error("Server error:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message || "Internal server error" 
    });
  });


  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();
