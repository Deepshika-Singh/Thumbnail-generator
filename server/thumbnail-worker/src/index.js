const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  // Add your production frontend origin here, e.g.:
  // "https://your-frontend-domain.com",
];

function buildCorsHeaders(request) {
  const origin = request.headers.get("Origin");

  const baseHeaders = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };

  // Echo back known origins; otherwise fall back to "*"
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      ...baseHeaders,
      "Access-Control-Allow-Origin": origin,
    };
  }

  // Safe fallback for non-credentialed requests
  return {
    ...baseHeaders,
    "Access-Control-Allow-Origin": "*",
  };
}

function jsonResponse(request, status, body) {
  const corsHeaders = buildCorsHeaders(request);

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS preflight (always respond with 204 + CORS headers)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(request),
      });
    }

    // Route check first
    if (pathname !== "/thumbnail/generate") {
      return jsonResponse(request, 404, {
        success: false,
        message: "Not Found",
      });
    }

    // Enforce POST for the thumbnail endpoint
    if (request.method !== "POST") {
      return jsonResponse(request, 405, {
        success: false,
        message: "Method Not Allowed",
      });
    }

    try {
      // Basic Bearer token validation (structure only; real JWT validation
      // should be added if you need full auth here)
      const authHeader = request.headers.get("Authorization") || "";
      if (!authHeader.startsWith("Bearer ")) {
        return jsonResponse(request, 401, {
          success: false,
          message: "Missing or invalid Authorization header",
        });
      }

      const token = authHeader.slice("Bearer ".length).trim();
      if (!token) {
        return jsonResponse(request, 401, {
          success: false,
          message: "Missing bearer token",
        });
      }

      // Parse JSON body
      const body = await request.json();
      const prompt = (body?.prompt || "").trim();

      // Debug log of what was received
      console.log("Received prompt:", prompt);

      // Validate prompt
      if (!prompt) {
        return jsonResponse(request, 400, {
          success: false,
          message: "Please enter a prompt",
        });
      }

      // Call Cloudflare AI - Stable Diffusion XL
      const aiResult = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        {
          prompt,
          width: 1280,
          height: 720,
        }
      );

      console.log("AI result constructor:", aiResult && aiResult.constructor && aiResult.constructor.name);

      // Handle both ArrayBuffer and ReadableStream results
      const imageArrayBuffer =
        aiResult instanceof ArrayBuffer
          ? aiResult
          : await new Response(aiResult).arrayBuffer();

      const base64 = arrayBufferToBase64(imageArrayBuffer);

      // Success response
      return jsonResponse(request, 200, {
        success: true,
        image: `data:image/png;base64,${base64}`,
      });
    } catch (err) {
      // Safe generic error for clients
      return jsonResponse(request, 500, {
        success: false,
        message: "Internal server error",
      });
    }
  },
};