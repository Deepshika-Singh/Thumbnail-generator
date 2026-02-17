import { DownloadIcon, ImageIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api";
import { useAuth } from "../context/AuthContext";

type GeneratedThumbnail = {
  _id: string;
  image_url?: string;
  imageUrl?: string;
  user_prompt?: string;
  title?: string;
  createdAt: string;
  isGenerating?: boolean;
};

const MyGeneration = () => {
  const [items, setItems] = useState<GeneratedThumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { isAuthenticated, bootstrapped } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bootstrapped) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchThumbnails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiFetch("/thumbnail/my-generations");
        
        if (data && data.success && Array.isArray(data.thumbnails)) {
          setItems(data.thumbnails);
        } else {
          setItems([]);
        }
      } catch (err: any) {
        console.error("❌ Error fetching thumbnails:", err);
        setError(err.message || "Network error occurred");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, [isAuthenticated, bootstrapped, navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this thumbnail?")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await apiFetch(`/thumbnail/${id}`, { method: "DELETE" });
      
      if (response.success) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete thumbnail");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (imageData: string, title: string, id: string) => {
    try {
      const filename = `${title || 'thumbnail'}-${id}.png`;

      if (imageData.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const response = await fetch(imageData);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert("Failed to download image");
    }
  };

  if (!bootstrapped || loading) {
    return (
      <div className="pt-28 pb-32 min-h-screen">
        <main className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-gray-400">
              {!bootstrapped ? "Checking authentication..." : "Loading your thumbnails..."}
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 pb-32 min-h-screen">
        <main className="max-w-6xl mx-auto px-4">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md text-center">
            <p className="text-red-400 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 min-h-screen">
      <main className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-white font-semibold">My Generations</h1>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
          >
            Refresh
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 mt-20 text-center text-gray-300">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-xl font-medium">No thumbnails yet</p>
            <button
              onClick={() => navigate('/generate')}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Thumbnail
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const imageUrl = item.image_url || item.imageUrl;
              const isValidImage = imageUrl && (
                imageUrl.startsWith('data:image') || 
                imageUrl.startsWith('http')
              );
              const isDeleting = deletingId === item._id;
              
              return (
                <div key={item._id} className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <div className="aspect-video overflow-hidden bg-gray-900">
                    {isValidImage ? (
                      <img
                        src={imageUrl}
                        alt={item.title || "Thumbnail"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium truncate max-w-[60%]">
                        {item.title || "Untitled"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(imageUrl, item.title || 'thumbnail', item._id)}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-blue-600 transition-colors"
                          disabled={isDeleting}
                        >
                          <DownloadIcon className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-red-600 transition-colors"
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded-lg text-xs text-gray-300">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyGeneration;