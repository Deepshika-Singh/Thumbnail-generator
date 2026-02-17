import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, getStoredToken } from "../context/AuthContext";
import { apiFetch } from "../config/api";
import LeftPanel from "../components/generator-components/LeftPanel";
import RightPanel from "../components/generator-components/RightPanel";

const Generate = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image_url, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleGenerate = async () => {
    const token = getStoredToken();
    if (!token) return navigate("/login");

    const finalPrompt = `${title} ${prompt}`.trim();
    if (!finalPrompt) return alert("Please enter a prompt");

    try {
      setLoading(true);

      // Step 1: Generate image via worker
      console.log("🎨 Generating image...");
      const generateData = await apiFetch("/thumbnail/generate", {
        method: "POST",
        body: JSON.stringify({ 
          prompt: finalPrompt,
        }),
      });

      console.log("Generate response:", generateData);

      if (!generateData.success) throw new Error(generateData.message);

      // Step 2: Save to database via backend
      console.log("💾 Saving to database...");
      const saveData = await apiFetch("/thumbnail/save", {
        method: "POST",
        body: JSON.stringify({
          image: generateData.image,
          title: title || "AI Generated Thumbnail",
          prompt: finalPrompt,
          userPrompt: prompt
        }),
      });

      console.log("Save response:", saveData);

      if (!saveData.success) throw new Error(saveData.message);

      // Set the image URL for preview
      setImageUrl(generateData.image);
      
      // Navigate to my thumbnails
      // navigate("/my-thumbnails");
      
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to generate thumbnail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-32 min-h-screen">
      <main className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          <LeftPanel
            title={title}
            setTitle={setTitle}
            prompt={prompt}
            setPrompt={setPrompt}
          />

          <RightPanel
            loading={loading}
            handleGenerate={handleGenerate}
            imageUrl={image_url ?? undefined}
          />
        </div>
      </main>
    </div>
  );
};

export default Generate;