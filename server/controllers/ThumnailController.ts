
// import type { Request, Response } from "express";
// import axios from "axios";
// import Thumbnail from "../models/Thumbnail.ts";

// export const generateThumbnail = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const { title, prompt, style, text } = req.body as {
//       title?: string;
//       prompt?: string;
//       style?: string;
//       text?: string;
//     };

//     const userPrompt = text || prompt || title;

//     if (!userPrompt) {
//       return res.status(400).json({
//         success: false,
//         message: "Prompt text is required",
//       });
//     }

//     const workerUrl = process.env.CF_THUMBNAIL_WORKER_URL;

//     if (!workerUrl) {
//       return res.status(500).json({
//         success: false,
//         message: "Cloudflare worker URL is not configured",
//       });
//     }

//     // 1️⃣ Save DB record (before generation)
//     const thumbnail = await Thumbnail.create({
//       userId,
//       title: title || "AI Generated Thumbnail",
//       user_prompt: userPrompt,
//       style: style || "Minimalist",
//       isGenerating: true,
//     });

//     // 2️⃣ Call Cloudflare Worker via Axios
//     const cfResponse = await axios.post<ArrayBuffer>(
//       workerUrl,
//       {
//         prompt: `${userPrompt}, YouTube thumbnail`,
//       },
//       {
//         responseType: "arraybuffer",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // 3️⃣ Convert image to base64
//     const buffer = Buffer.from(cfResponse.data);
//     const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

//     // 4️⃣ Update DB
//     thumbnail.imageUrl = base64Image;
//     thumbnail.isGenerating = false;
//     await thumbnail.save();

//     return res.json({
//       success: true,
//       thumbnail,
//     });
//   } catch (error: any) {
//     console.error("Thumbnail generation error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Thumbnail generation failed",
//     });
//   }
// };

// export const getMyThumbnails = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const thumbnails = await Thumbnail.find({ userId })
//       .sort({ createdAt: -1 })
//       .lean();

//     return res.json({
//       success: true,
//       thumbnails,
//     });
//   } catch (error: any) {
//     console.error("Fetch my generations error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch generations",
//     });
//   }
// };





// // import type { Request, Response } from "express";
// // import Thumbnail from "../models/Thumbnail.ts";
// // import { generateImageFromPrompt } from "../configs/aiThumbnail.service.ts";


// // export const generateThumbnail = async (req: Request, res: Response) => {
// //   try {
// //     const userId = req.session?.userId;

// //     if (!userId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Unauthorized",
// //       });
// //     }

// //     const {
// //       title,
// //       prompt,
// //       style,
// //       aspect_ratio,
// //       color_scheme,
// //       text_overlay,
// //     } = req.body;

// //     const finalPrompt = `${prompt}, ${color_scheme} ${style} style, YouTube thumbnail, high contrast, bold text`;

// //     // 1️⃣ create DB record
// //     const thumbnail = await Thumbnail.create({
// //       userId,
// //       title,
// //       user_prompt: prompt,
// //       prompt_used: finalPrompt,
// //       style,
// //       aspect_ratio,
// //       color_scheme,
// //       text_overlay,
// //       isGenerating: true,
// //     });

// //     // 2️⃣ generate image
// //     const imageUrl = await generateImageFromPrompt(finalPrompt);

// //     // 3️⃣ update DB
// //     thumbnail.image_url = imageUrl;
// //     thumbnail.isGenerating = false;
// //     await thumbnail.save();

// //     return res.status(201).json({
// //       success: true,
// //       message: "Thumbnail generated successfully",
// //       thumbnail,
// //     });

// //   } catch (error: any) {
// //     console.error("🔥 Thumbnail generation error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || "Thumbnail generation failed",
// //     });
// //   }
// // };

import type { Request, Response } from "express";
import axios from "axios";
import Thumbnail from "../models/Thumbnail.js";

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const token = req.headers.authorization;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const workerUrl = process.env.CF_THUMBNAIL_WORKER_URL;
    if (!workerUrl) {
      return res.status(500).json({ success: false, message: "Worker URL not configured" });
    }

    const cfResponse = await axios.post(
      `${workerUrl}/thumbnail/generate`,
      { prompt: `${prompt}, YouTube thumbnail` },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        timeout: 30000,
      }
    );

    return res.json({
      success: true,
      image: cfResponse.data.image,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Generation failed",
    });
  }
};

export const saveThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { image, title, prompt, userPrompt } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const thumbnail = await Thumbnail.create({
      userId,
      title: title || "AI Generated Thumbnail",
      user_prompt: prompt || userPrompt || title,
      image_url: image,
      isGenerating: false,
    });

    return res.json({ success: true, thumbnail });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save thumbnail",
    });
  }
};

export const getMyThumbnails = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const thumbnails = await Thumbnail.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, thumbnails });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch thumbnails",
    });
  }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const thumbnailId = req.params.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const thumbnail = await Thumbnail.findOneAndDelete({
      _id: thumbnailId,
      userId: userId,
    });

    if (!thumbnail) {
      return res.status(404).json({ success: false, message: "Thumbnail not found" });
    }

    return res.json({ success: true, message: "Thumbnail deleted successfully" });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete thumbnail",
    });
  }
};