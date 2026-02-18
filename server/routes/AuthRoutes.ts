import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser,
} from "../controllers/AuthControllers.js";
import protect from "../middlewares/auth.js";

const AuthRouter = express.Router();

// Signup / Register
AuthRouter.post("/register", registerUser);
AuthRouter.post("/signup", registerUser);

// Login
AuthRouter.post("/login", loginUser);

// Verify current user (JWT protected)
AuthRouter.get("/verify", protect, verifyUser);

// Logout (client will delete token; route kept for completeness/telemetry)
AuthRouter.post("/logout", protect, logoutUser);

// ✅ TEST ENDPOINT - Add this to verify backend is working
AuthRouter.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Auth backend is working!",
    timestamp: new Date().toISOString()
  });
});

export default AuthRouter;