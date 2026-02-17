import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type GeneratedThumbnail = {
  id: string;
  imageUrl: string;
  createdAt: string;
  title?: string;
};

const YtPreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<GeneratedThumbnail | null>(null);

  useEffect(() => {
    const stored: GeneratedThumbnail[] = JSON.parse(
      localStorage.getItem("my-thumbnails") || "[]"
    );
    const found = stored.find((item) => item.id === id) || null;
    setThumbnail(found);
  }, [id]);

  if (!thumbnail) {
    return (
      <div className="pt-28 pb-32 min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-300">Thumbnail not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 min-h-screen bg-zinc-900 text-white">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-white hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden aspect-video w-full relative">
          <img
            src={thumbnail.imageUrl}
            alt="Video Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 2v20l18-10L4 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div>
          <h1 className="text-xl font-semibold">{thumbnail.title || "AI Generated Thumbnail"}</h1>
          <p className="text-gray-400 text-sm mt-1">
            Uploaded on {new Date(thumbnail.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4">
          <button className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded hover:bg-white/20">
            <ThumbsUp className="w-4 h-4" /> 0
          </button>
          <button className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded hover:bg-white/20">
            <ThumbsDown className="w-4 h-4" /> 0
          </button>
          <button className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded hover:bg-white/20">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Channel / Description */}
        <div className="mt-6 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white/60">
            C
          </div>
          <div className="flex-1">
            <p className="font-semibold">AI Thumbnail Generator</p>
            <p className="text-gray-400 text-sm mt-1">
              This is a generated thumbnail preview. You can download it or go back to My Generations to create more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YtPreview;
