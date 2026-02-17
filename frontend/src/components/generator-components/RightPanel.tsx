import { ImageIcon, Loader2Icon, DownloadIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type RightPanelProps = {
  loading: boolean;
  handleGenerate: () => void;
  imageUrl?: string;
};

function RightPanel({ loading, handleGenerate, imageUrl }: RightPanelProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!imageUrl) return;
    URL.revokeObjectURL(imageUrl); // free memory
    window.location.reload(); // refresh preview
  };

  const handleViewAll = () => {
    navigate("/my-generation");
  };

  return (
    <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Preview</h2>
        <button
          onClick={handleViewAll}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="aspect-video rounded-lg border-2 border-dashed border-white/20 bg-black/30 relative overflow-hidden flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40">
            <Loader2Icon className="w-10 h-10 text-blue-400 animate-spin" />
            <p className="text-sm text-zinc-200">AI is creating your thumbnail</p>
          </div>
        )}

        {!loading && imageUrl?.trim() && (
          <img 
            src={imageUrl} 
            alt="Generated" 
            className="w-full h-full object-cover"
          />
        )}

        {!loading && !imageUrl?.trim() && (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-gray-300">No thumbnail generated yet</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="flex-1 py-3 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white transition-colors"
        >
          {loading ? "Generating..." : "Generate Thumbnail"}
        </button>

        {imageUrl?.trim() && (
          <>
            <a 
              href={imageUrl} 
              download="thumbnail.png" 
              className="px-4 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <DownloadIcon className="w-5 h-5 text-white" />
            </a>
            <button 
              onClick={handleDelete} 
              className="px-4 rounded-xl bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RightPanel;