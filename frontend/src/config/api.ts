import { getStoredToken } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL as string;
const WORKER_URL = import.meta.env.VITE_THUMBNAIL_WORKER_URL as string;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = getStoredToken();

  let baseUrl;
  if (path === "/thumbnail/generate") {
    baseUrl = WORKER_URL;
    console.log("🎨 Using WORKER_URL for generation");
  } else {
    baseUrl = BACKEND_URL;
    console.log("🖥️ Using BACKEND_URL for:", path);
  }

  const url = `${baseUrl}${path}`;
  console.log("🌐 Full URL:", url);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Token included");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log("📡 Response status:", response.status);

    const data = await response.json().catch(() => null);
    console.log("📦 Response data:", data);

    if (!response.ok) {
      throw new Error(data?.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("❌ API Fetch Error:", error);
    throw error;
  }
};
