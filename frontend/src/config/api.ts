import { getStoredToken } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
const WORKER_URL = import.meta.env.VITE_THUMBNAIL_WORKER_URL;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = getStoredToken();

  // Generation goes to worker, everything else to backend
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

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
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
// import { getStoredToken } from "../context/AuthContext";

// const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
// const WORKER_URL = import.meta.env.VITE_THUMBNAIL_WORKER_URL;

// export const apiFetch = async (path: string, options: RequestInit = {}) => {
//   const token = getStoredToken();

//   const baseUrl = path.startsWith("/thumbnail")
//     ? WORKER_URL
//     : BACKEND_URL;

//   const url = `${baseUrl}${path}`;

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(options.headers || {}),
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     throw new Error(data?.message || "Request failed");
//   }

//   return data;
// };
