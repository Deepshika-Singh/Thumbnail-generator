// import express from "express";
// import { generateThumbnail, getMyThumbnails } from "../controllers/ThumnailController.ts";
// import protect from "../middlewares/auth.ts";

// const router = express.Router();

// // Protected thumbnail generation
// router.post("/generate", protect, generateThumbnail);

// // Protected list of current user's generations
// router.get("/my-generations", protect, getMyThumbnails);

// export default router;

import express from "express";
import { 
  generateThumbnail, 
  getMyThumbnails, 
  saveThumbnail,
  deleteThumbnail 
} from "../controllers/ThumnailController.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", protect, generateThumbnail);
router.get("/my-generations", protect, getMyThumbnails);
router.post("/save", protect, saveThumbnail);
router.delete("/:id", protect, deleteThumbnail);
router.get("/test", protect, (req, res) => {
  res.json({ success: true, message: "Backend is working!" });
});

export default router;