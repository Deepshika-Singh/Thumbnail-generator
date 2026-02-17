import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// console.log("🌍 ENV LOADED:", {
//   OPENAI: !!process.env.OPENAI_API_KEY,
// });
