import mongoose, { Schema, Document } from "mongoose";

export interface IThumbnail extends Document {
  userId: string;
  title: string;
  description?: string;
  style: "Bold & Graphics" | "Tech / Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
  aspect_ratio?: "16:9" | "1:1" | "9:16";
  color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
  text_overlay?: boolean;
  image_url?: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ThumbnailSchema = new Schema<IThumbnail>(
  {
    userId: { type: String, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    style: {
      type: String,
      enum: ["Bold & Graphics", "Tech / Futuristic", "Minimalist", "Photorealistic", "Illustrated"],
      default: "Minimalist",
    },
    aspect_ratio: { type: String, enum: ["16:9", "1:1", "9:16"], default: "16:9" },
    color_scheme: {
      type: String,
      enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"],
    },
    text_overlay: { type: Boolean, default: true },
    image_url: { type: String },
    prompt_used: { type: String },
    user_prompt: { type: String },
    isGenerating: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Thumbnail ||
  mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);
